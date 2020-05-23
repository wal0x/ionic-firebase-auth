import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import * as firebase from "firebase";

@Injectable({ providedIn: "root" })
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.user;
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signup(email: string, password: string, name: string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      let currentUser = await this.afAuth.currentUser;
      await currentUser.updateProfile({
        displayName: name
      });
    } catch (error) {
      throw error;
    }
  }

  logout() {
    return this.afAuth.signOut();
  }
}
