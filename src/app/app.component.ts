import { Component, NgZone } from "@angular/core";
import { Router } from "@angular/router";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { AngularFireAuth } from "@angular/fire/auth";
import { first } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.afAuth.onAuthStateChanged(user => {
      if (!user) {
        this.ngZone.run(() => {
          this.router.navigate(["/login"]);
        });
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.afAuth.user.pipe(first()).subscribe(user => {
        if (user) {
          this.ngZone.run(() => {
            this.router.navigate(["/home"]);
          });
        } else {
          this.ngZone.run(() => {
            this.router.navigate(["/login"]);
          });
        }
      });
      this.splashScreen.hide();
    });
  }
}
