import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"]
})
export class SignupPage implements OnInit {
  name: string = "";
  email: string = "";
  password: string = "";
  cpassword: string = "";
  error: string = "";
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async signup() {
    if (this.password !== this.cpassword) {
      this.error = "Error: Passwords do not match.";
    } else if (!this.name) {
      this.error = "Error: Name is mandatory.";
    } else {
      try {
        await this.authService.signup(this.email, this.password, this.name);
        this.router.navigate(["/home"]);
      } catch (error) {
        this.error = error;
      }
    }
  }
}
