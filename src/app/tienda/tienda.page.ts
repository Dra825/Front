import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonGrid, IonRow, IonCol, IonItem, IonAvatar, IonLabel, IonButton, IonInput, IonIcon,} from '@ionic/angular/standalone';
import { IonImg } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonGrid, IonRow, IonCol, IonItem, IonAvatar, IonLabel, IonButton, IonInput, IonIcon, FormsModule, IonImg ]
})
export class TiendaPage implements OnInit {
public data: any
public items: any
public contador: any = 0
public brazalete = true
public gemas: any

public url: string = 'https://back-final-7xif.onrender.com'
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.data = this.route.snapshot.params;
    console.log(this.data)
    console.log(this.data)
    this.http.get(`${this.url}/info/${this.data.user}`).subscribe((response) => {
      console.log(response);
      this.gemas = response
  });
    this.http.get(`${this.url}/cargar_items/${this.data.user}`).subscribe((response) => {
      console.log(response);
      this.items = response
  while (this.contador < this.items.length ) {
   if (this.items[this.contador].item_id == "Brazalete") {
    this.brazalete = false
   }
   this.contador++
  }
  });
  }
   
  volver_home() {
    

    this.router.navigate(['/home',]);
  }

Comprar(dinero: number, nombre: string) {
if (this.gemas.gemas >= dinero) {
  let Data = {
    gemas: dinero,
    user: this.data.user,
    item: nombre
  }
  this.http.post(`${this.url}/add_item`, Data).subscribe((response) => {
    console.log(nombre); 
    console.log(response);
    this.ngOnInit()
});
}
else {
  console.log("no hay dinero")
}
}
}
