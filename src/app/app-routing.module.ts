import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { NegateAuthGuard } from "./guards/negate-auth.guard";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then(m => m.LoginPageModule),
    canActivate: [NegateAuthGuard]
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.module").then(m => m.SignupPageModule),
    canActivate: [NegateAuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
