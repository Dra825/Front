import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonGrid, IonRow, IonCol, IonItem, IonAvatar, IonLabel, IonButton, IonInput, IonIcon } from '@ionic/angular/standalone';
import { IonImg } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonGrid, IonRow, IonCol, IonItem, IonAvatar, IonLabel, IonButton, IonInput, IonIcon, IonImg]
})
export class HomePage implements OnInit {
 public url: string = 'http://localhost:3000'
 public info_tiradas: any = 0
 public user: any
 public usuario: any
 public html: boolean = true
 public carta: any 
 public tiempo: any
 public divisor: number = 1
 public multi: any
  constructor(private http: HttpClient, private router: Router, private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
  
    this.auth.user$.subscribe((data) =>{
      this.user = data
      console.log(this.user)
      const Data = {
        email: this.user.email,
        name: this.user.name
      }
      console.log(Data)
      this.http.post(`${this.url}/usuario`, Data).subscribe((response) => {
        console.log("Cargando o creando datos"); 
        console.log(response);
       this.usuario = response
       console.log(this.usuario.id)
       this.getTiradas(this.usuario.id)
      });

    });
    
   
 
 
  }
  
  Inventario(){
    console.log(this.usuario.id)
    let nombre = {
      
      user: this.usuario.id
    }

    this.router.navigate(['/cartas', nombre ]);
  }
Activar() {
   this.multi =  setInterval(() => {
    this.http.get(`${this.url}/tiempo_restar/${this.usuario.id}`).subscribe((response5) => {
      console.log(response5);
      this.tiempo = response5
      if(this.tiempo.tiempo <= 0) {
        clearInterval(this.multi)
        this.divisor = 1
      } 
      else {
        this.divisor = 10
      }
  });
  }, 1000);
}

Pausar() {
  clearInterval(this.multi)
  this.divisor = 1
}
  Peleas(){
    console.log(this.usuario.id)
    let nombre = {
      
      user: this.usuario.id
    }

    this.router.navigate(['/peleas', nombre ]);
  }
  Tienda(){
    let datos = {
      user: this.usuario.id, 
      gemas: this.usuario.gemas
    }
    this.router.navigate(['/tienda', datos ]);
  }

  roll() {

    this.html = false
    setTimeout(() => {
      this.html = true
    }, 2000);
    let Rareza = Math.floor(Math.random() * 100000000) + 1;
    Rareza = Math.floor(Rareza/this.divisor)
    console.log(Rareza)
    // Carta Fuego
    if (Rareza >= 50000000) {
      const info = {
        user: this.usuario.id,
        carta: 1,
        

      };
      this.http.post(`${this.url}/add_card`, info).subscribe((response) => {
        console.log("Fuego"); 
        console.log(response);
        this.carta = response
        
       this.getTiradas(this.usuario.id)
      });
     
    }
   //Carta Cristal
    else if (Rareza >= 25000000){
      const info = {
        user: this.usuario.id,
        carta: 2,
      
      };
      this.http.post(`${this.url}/add_card`, info).subscribe((response) => {
        console.log("Cristal"); 
        console.log(response);
        this.carta = response
        
      this.getTiradas(this.usuario.id)
    });

    
  
  }
  
 //Carta Pez Globo
 else if (Rareza >= 100000000/8){
  const info = {
    user: this.usuario.id,
    carta: 3,
  
  };
  this.http.post(`${this.url}/add_card`, info).subscribe((response) => {
    console.log("Pez Globo"); 
    console.log(response);
    this.carta = response
    
  this.getTiradas(this.usuario.id)
});




}

 //Carta Pau Brando
 else if (Rareza >= 100000000/16){
  const info = {
    user: this.usuario.id,
    carta: 4,
  
  };
  this.http.post(`${this.url}/add_card`, info).subscribe((response) => {
    console.log("Pau Brando"); 
    console.log(response);
    this.carta = response
    
  this.getTiradas(this.usuario.id)
});




}

 //Carta Time
 else if (Rareza >= 100000000/32){
  const info = {
    user: this.usuario.id,
    carta: 5,
  
  };
  this.http.post(`${this.url}/add_card`, info).subscribe((response) => {
    console.log("Time"); 
    console.log(response);
    this.carta = response
    
  this.getTiradas(this.usuario.id)
});




}

 //Carta Furia
 else if (Rareza >= 100000000/64){
  const info = {
    user: this.usuario.id,
    carta: 6,
  
  };
  this.http.post(`${this.url}/add_card`, info).subscribe((response) => {
    console.log("Furia"); 
    console.log(response);
    this.carta = response
    
  this.getTiradas(this.usuario.id)
});




}

 //Carta Hacker
 else {
  const info = {
    user: this.usuario.id,
    carta: 7,
  
  };
  this.http.post(`${this.url}/add_card`, info).subscribe((response) => {
    console.log("Hacker"); 
    console.log(response);
    this.carta = response
    
  this.getTiradas(this.usuario.id)
});




}



  }

  getTiradas(user: string) {
    this.http.get(`${this.url}/info/${user}`).subscribe((response) => {
      console.log(response);
      this.info_tiradas = response
   });
  }
  
}

