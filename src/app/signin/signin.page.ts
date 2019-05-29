import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";
import { first } from "rxjs/operators";
import { NavController, LoadingController } from "@ionic/angular";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"]
})
export class SigninPage implements OnInit {
  public form: any = {};
  public isEmailValid: boolean;
  public isPasswordValid: boolean;
  returnUrl: string;

  events: any;

  constructor(
    private authService: AuthService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isEmailValid = true;
    this.isPasswordValid = true;
  }

  ngOnInit() {
    // reset login status
    this.authService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    console.log(this.returnUrl);
  }

  async onSignIn(): Promise<void> {
    if (!this.validate()) {
      return;
    }
    const loading = await this.loadingController.create({
      message: 'Please wait',
      duration: 2000
    });
    await loading.present();

    this.authService
      .login(this.form)
      .pipe(first())
      .subscribe(
        async data => {
          await loading.onDidDismiss();
          this.router.navigateByUrl('home');
        },

        async error => {
          await loading.onDidDismiss();
          console.error(error);
        }
      );
  }

  validate(): boolean {
    this.isEmailValid = true;
    this.isPasswordValid = true;
    if (!this.form.email || this.form.email.length == 0) {
      this.isEmailValid = false;
    }

    if (!this.form.password || this.form.password.length == 0) {
      this.isPasswordValid = false;
    }
    return this.isPasswordValid && this.isEmailValid;
  }
}
