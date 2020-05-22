import {
  Component,
  OnInit,
  NgZone,
  ChangeDetectionStrategy
} from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";
  error: string;
  constructor(
    private authService: AuthService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ngOnInit() {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.ngZone.run(() => {
        this.error = "";
        this.router.navigate(["/home"]);
      });
    } catch (error) {
      this.ngZone.run(() => {
        this.error = error;
      });
    }
  }
}
