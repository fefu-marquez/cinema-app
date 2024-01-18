import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public displayName: string;

  constructor(
    private auth: AuthService,
    private navController: NavController,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    this.auth.isLoggedIn().subscribe((isLoggedIn) => {
      this.menuController.enable(isLoggedIn);
    });

    this.auth.user$.subscribe((user) => {
      if (!!user) this.displayName = user.firstName;
    });
  }

  async logout() {
    await this.auth.logout();
    await this.navController.navigateRoot('/login');
  }
}
