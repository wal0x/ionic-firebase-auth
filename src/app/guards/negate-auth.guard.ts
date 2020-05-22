import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { AuthGuard } from "./auth.guard";

@Injectable({
  providedIn: "root"
})
export class NegateAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private authGuard: AuthGuard) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authGuard.canActivate(next, state).pipe(
      take(1),
      map(user => {
        return !user;
      })
    );
  }
}
