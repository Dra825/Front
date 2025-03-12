
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
// import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';
import {IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonGrid, IonRow, IonCol, IonItem, IonAvatar, IonLabel, IonButton, IonInput, IonIcon, IonProgressBar, IonMenu, IonListHeader, IonMenuToggle, IonButtons, IonMenuButton, IonRouterOutlet} from '@ionic/angular/standalone';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonGrid, IonRow, IonCol, IonItem, IonAvatar, IonLabel, IonButton, IonInput, IonIcon, IonProgressBar, IonMenu, IonListHeader, IonMenuToggle, IonButtons, IonMenuButton, IonRouterOutlet ],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Cartas', url: '/cartas', icon: 'reader' },
    { title: 'Peleas', url: '/peleas', icon: 'reader' },
    { title: 'Tienda', url: '/tienda', icon: 'reader' },
  ];
  constructor() {
    addIcons(icons);
  }
}
