import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { take, first } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  user: firebase.User;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.pipe(first()).subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
