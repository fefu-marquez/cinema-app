import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';
import { MenuController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private isLoggedIn$: Subscription;
  constructor(
    private auth: AuthService,
    private navController: NavController,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedIn().subscribe((isLoggedIn) => {
      this.menuController.enable(isLoggedIn);
    });
  }

  async logout() {
    await this.auth.logout();
    await this.navController.navigateRoot('/login');
  }
}
