import {Component, OnInit} from '@angular/core';
import {UserService} from "@targetworx/shared/data-access-user";
import {Router} from "@angular/router";
import {distinctUntilChanged} from "rxjs";

@Component({
  selector: 'targetworx-root',
  template: `
    <div class="font-normal hover:font-bold">Admin Dashboard</div>
    <div *ngIf="isLoggedIn$ | async; else signIn">
      You are authenticated so you can see this content.
    </div>
    <ng-template #signIn><router-outlet></router-outlet></ng-template>
  `,
})
export class AppComponent implements OnInit {
  isLoggedIn$ = this.userService.isUserLoggedIn$;
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.isLoggedIn$
        .pipe(distinctUntilChanged())
        .subscribe(async (loggedIn) => {
          // Queue the navigation after initialNavigation blocking is completed
          setTimeout(() => {
            if (!loggedIn) {
              this.router.navigateByUrl('login');
            } else {
              this.router.navigateByUrl('');
            }
          });
        });
  }
}
