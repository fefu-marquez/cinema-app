import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthService, private navController: NavController) {}

  async logout() {
    await this.auth.logout();
    await this.navController.navigateRoot('/login');
  }
}
