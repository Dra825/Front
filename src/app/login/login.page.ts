import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonGrid, IonRow, IonCol, IonItem, IonAvatar, IonLabel, IonButton, } from '@ionic/angular/standalone';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonGrid, IonRow, IonCol, IonItem, IonAvatar, IonLabel, IonButton,  CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor(private auth: AuthService, @Inject(DOCUMENT) public document: Document) { }

  ngOnInit() {
  }

  login() {
    this.auth.loginWithRedirect({
     appState: {
      target: '/home'
     }
  });
}

logout() {
  this.auth.logout({ 
    logoutParams: {
      returnTo: this.document.location.origin 
    }
  });
}
}
