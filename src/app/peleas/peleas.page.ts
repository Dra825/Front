import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonGrid, IonRow, IonCol, IonItem, IonAvatar, IonLabel, IonButton, IonInput, IonIcon, IonProgressBar } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peleas',
  templateUrl: './peleas.page.html',
  styleUrls: ['./peleas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonGrid, IonRow, IonCol, IonItem, IonAvatar, IonLabel, IonButton, IonInput, IonIcon, CommonModule, FormsModule, IonProgressBar]

})
export class PeleasPage implements OnInit {

  public url: string = 'http://localhost:3000'
  public equipo_bot: any
  constructor(private http: HttpClient,private route: ActivatedRoute, private router: Router) { }
public user: any
public carta_activa_R: any //CARTA QUE SE ESTA JUEGANDO Y DEL RIVAL, 
public carta_activa_N: any //CARTA QUE SE ESTA JUEGANDO Y NUESTRA
public contador_carta_R: number = 0 //CONTADOR PARA SABER NUESTRAS CARTAS DEL RIVAL
public contador_carta_N: number = 0 //CONTADOR PARA SABER NUESTRAS CARTAS NUESTRAS
public turno: string = "player"
public pelea_interval: boolean = false
public html: boolean = false
public botones: boolean = false
public cartas_restantes_N: any 
public cartas_restantes_R: any 
public texto: any = "Empieza la batalla"
public progress_N = 1;
public progress_R = 1;
public colorin_N = "success";
public colorin_R = "success";
public vida_max_N: any
public vida_max_R: any
public claim: boolean = false
public gemas: any
public nivel: any
public furia_N: number = 1
public furia_R: number = 1
public hacker_N: number = 0
public hacker_R: number = 0
PeleaBotoncitos = false;  
PeleaBotoncitos2 = false;  
PeleaBotoncitos3 = false;
  ngOnInit() {
    this.user = this.route.snapshot.params;
    console.log(this.user)
  }
  

  PillarBotYUser(nivel: number){
    this.botones = true
    this.nivel = nivel
    this.PeleaBotoncitos = true;
   let botoncitos_UwU = document.getElementById("botones")
   if (botoncitos_UwU) {
    botoncitos_UwU.style.opacity = "0";
  }
    console.log(this.user)
    this.http.get(`${this.url}/bot/${nivel}`).subscribe((response1) => {
      console.log(response1);
      console.log(this.gemas)
      this.http.get(`${this.url}/equipo/${this.user.user}`).subscribe((response2) => {
        console.log(response2);
        let cartas_R = Object.keys(response1).filter(key => key.startsWith('carta_id'));
        let cartas_N = Object.keys(response2).filter(key => key.startsWith('carta_id'));
        this.recoger_carta(response1, response2, cartas_R, cartas_N, "N", false )
        setTimeout(() => {
        this.recoger_carta(response1, response2, cartas_R, cartas_N, "R", false )
      }, 1000);  setTimeout(() => {
        this.Pelea(response1, response2, cartas_R, cartas_N)
      }, 2000); 
      });
      
    });

   

   
  }
  Pelea(equipo_R: any, equipo_N: any, filtro_R: any, filtro_N: any){
    console.log(`iniciando pelea con el equipo_R con una cantidad de cartas vivas de ${Object.keys(equipo_R).length -2} y del equipo_N de ${Object.keys(equipo_N).length -2}`)


if (this.pelea_interval === true) {

//while (Object.keys(equipo_R).length >= 3 && Object.keys(equipo_N).length >= 3) {
this.html = true
    
   let pelea = setInterval(() => {
      if (this.turno == "player") {
       
      this.texto = "Atacas a la carta rival"
      if (this.carta_activa_N.nombre == "Hacker") {
        this.hacker_N++
        if(this.hacker_N == 3){
          this.hacker_N = 0
          this.carta_activa_N.vida += Math.round(this.vida_max_N/5)
        
          if (this.carta_activa_N.vida > this.vida_max_N) {
            this.carta_activa_N.vida = this.vida_max_N
          }
      this.progress_R = this.carta_activa_R.vida/this.vida_max_R
      this.progress_N = this.carta_activa_N.vida/this.vida_max_N
      if (this.progress_N < 0.33) {
        this.colorin_N = "danger"
      }
      else if( this.progress_N < 0.66) {
        this.colorin_N = "warning"
      } 
      else {
        this.colorin_N = "success"
      }
        }
      } 
      else {
        this.hacker_N = 0
      }
      if (this.carta_activa_N.nombre == "Furia" && this.progress_N < 0.5) {
        this.furia_N = 2
      }
      else {
        this.furia_N = 1
      }
      if (this.carta_activa_N.nombre == "Time") {
       let random = Math.floor(Math.random() * 10) + 1;
       if (random == 3){
        this.carta_activa_R.vida -=  this.carta_activa_N.dano
        this.progress_R = this.carta_activa_R.vida/this.vida_max_R
       }
      }
      if (this.carta_activa_N.nombre == "Pau Brando" && this.carta_activa_N.vida == this.vida_max_N) { //Congela la carta del rival, asi inutilizando su habilidad y sus ataques durante 2 turnos.
        this.carta_activa_R.vida -=  this.carta_activa_N.dano
      this.progress_R = this.carta_activa_R.vida/this.vida_max_R
        this.carta_activa_R.vida -=  this.carta_activa_N.dano
      this.progress_R = this.carta_activa_R.vida/this.vida_max_R
      }
      this.carta_activa_R.vida -=  this.carta_activa_N.dano * this.furia_N
      if (this.carta_activa_R.nombre == "Pez Globo") { //Pez Globo devuelve daño de ataques normales.
        this.carta_activa_N.vida -= Math.round(this.carta_activa_N.dano/10)
      }
      this.progress_N = this.carta_activa_N.vida/this.vida_max_N
      this.progress_R = this.carta_activa_R.vida/this.vida_max_R
      
      if (this.progress_R < 0.33) {
        this.colorin_R = "danger"
      }
      else if( this.progress_R < 0.66) {
        this.colorin_R = "warning"
      } 
      else {
        this.colorin_R = "success"
      }
      if (this.carta_activa_N.nombre == "Fuego" && this.carta_activa_R.vida > 0) {
        setTimeout(() => {
        this.texto= "QUEMADURA"
        this.carta_activa_R.vida -=  Math.round(this.carta_activa_N.dano/10) //Pongo en todas las habilidades math round por las dudas.
        this.progress_R = this.carta_activa_R.vida/this.vida_max_R
        if (this.progress_R < 0.33) {
          this.colorin_R = "danger"
        }
        else if( this.progress_R < 0.66) {
          this.colorin_R = "warning"
        } 
        else {
          this.colorin_R = "success"
        }
      }, 1000);
      }

      else if (this.carta_activa_N.nombre == "Cristal") {
         this.carta_activa_N.vida = Math.round(this.carta_activa_N.vida * 0.90)
         this.progress_N = this.carta_activa_N.vida/this.vida_max_N
        this.carta_activa_N.dano =  Math.round(this.carta_activa_N.dano * 1.10)
      }
      
      this.turno = "rival"
      if(this.carta_activa_R.vida <= 0) {
        clearInterval(pelea) 
         
        this.carta_activa_R.vida = 0
        setTimeout(() => {
        this.texto = "Carta del equipo rival derrotada" 
        this.recoger_carta(equipo_R, equipo_N, filtro_R, filtro_N, "R", true)
      }, 500);
      }
      this.progress_R = this.carta_activa_R.vida/this.vida_max_R
      this.progress_N = this.carta_activa_N.vida/this.vida_max_N
    }
    
    else if (this.turno == "rival") {
      this.texto = "El rival ataca tu carta"
      if (this.carta_activa_R.nombre == "Hacker") {
        this.hacker_R++
        if(this.hacker_R == 3){
          this.hacker_R = 0
          this.carta_activa_R.vida += Math.round(this.vida_max_R/5)
          
          if (this.carta_activa_R.vida > this.vida_max_R) {
            this.carta_activa_R.vida = this.vida_max_R
          }
      this.progress_R = this.carta_activa_R.vida/this.vida_max_R
      this.progress_N = this.carta_activa_N.vida/this.vida_max_N
      if (this.progress_R < 0.33) {
        this.colorin_R = "danger"
      }
      else if( this.progress_R < 0.66) {
        this.colorin_R = "warning"
      } 
      else {
        this.colorin_R = "success"
      }
        }
      } 
      else {
        this.hacker_R = 0
      }
      if (this.carta_activa_R.nombre == "Furia" && this.progress_R < 0.5) {
        this.furia_R = 2
      }
      else {
        this.furia_R = 1
      }
      if (this.carta_activa_R.nombre == "Time") {
        let random = Math.floor(Math.random() * 10) + 1;
        if (random == 3){
         this.carta_activa_N.vida -=  this.carta_activa_R.dano
         this.progress_N = this.carta_activa_N.vida/this.vida_max_N
         
        }
       }
      if (this.carta_activa_R.nombre == "Pau Brando" && this.carta_activa_R.vida == this.vida_max_R) { //Congela la carta del rival, asi inutilizando su habilidad y sus ataques durante 2 turnos.
        this.carta_activa_N.vida -=  this.carta_activa_R.dano
      this.progress_N = this.carta_activa_N.vida/this.vida_max_N
        this.carta_activa_N.vida -=  this.carta_activa_R.dano
      this.progress_N = this.carta_activa_N.vida/this.vida_max_N
      }
      this.carta_activa_N.vida -=  this.carta_activa_R.dano * this.furia_R
      if (this.carta_activa_N.nombre == "Pez Globo") {
        this.carta_activa_R.vida -= Math.round(this.carta_activa_R.dano/10)
      }
      this.progress_R = this.carta_activa_R.vida/this.vida_max_R
      this.progress_N = this.carta_activa_N.vida/this.vida_max_N
      if (this.progress_N < 0.33) {
        this.colorin_N = "danger"
      }
      else if( this.progress_N < 0.66) {
        this.colorin_N = "warning"
      } 
      else {
        this.colorin_N = "success"
      }

      if (this.carta_activa_R.nombre == "Fuego" && this.carta_activa_N.vida > 0) {
        setTimeout(() => {
        this.texto= "QUEMADURA"
        this.carta_activa_N.vida -=  Math.round(this.carta_activa_R.dano/10) //Pongo en todas las habilidades math round por las dudis.
        this.progress_N = this.carta_activa_N.vida/this.vida_max_N
        if (this.progress_N < 0.33) {
          this.colorin_N = "danger"
        }
        else if( this.progress_N < 0.66) {
          this.colorin_N = "warning"
        } 
        else {
          this.colorin_N = "success"
        }
      }, 1000);
      }

      else if (this.carta_activa_R.nombre == "Cristal") {
        this.carta_activa_R.vida = Math.round(this.carta_activa_R.vida * 0.90)
        this.progress_R = this.carta_activa_R.vida/this.vida_max_R
        this.carta_activa_R.dano =  Math.round(this.carta_activa_R.dano * 1.10)
      }

      if(this.carta_activa_N.vida <= 0) {
        clearInterval(pelea)
        this.carta_activa_N.vida = 0
        setTimeout(() => {
        this.texto = 'Tu carta ha caido'
        this.recoger_carta(equipo_R, equipo_N, filtro_R, filtro_N, "N", true)
      }, 500);
      }
       this.turno = "player"
       this.progress_R = this.carta_activa_R.vida/this.vida_max_R
      this.progress_N = this.carta_activa_N.vida/this.vida_max_N
    }
    }, 2000);
   
  }
    


//}
}

recoger_carta(equipo_R: any, equipo_N: any, filtro_R: any, filtro_N: any, equipo: string, iniciar: boolean) {
  
  setTimeout(() => { 
    this.pelea_interval = true
  }, 1000);
 
      if (equipo == "R") {
        if(iniciar === true){

    delete equipo_R[filtro_R.shift()];
    
    
  }            
       
        console.log(filtro_R)
   
        
        if (Object.keys(equipo_R).length > 2) {
        this.carta_activa_R =  equipo_R[filtro_R[0]]
       


        this.http.get(`${this.url}/mostrar_cartas/${this.carta_activa_R}`).subscribe((response2) => {
          console.log(response2);
          this.carta_activa_R = response2
          this.hacker_R = 0
          this.vida_max_R = this.carta_activa_R.vida
          this.colorin_R = "success"
          this.progress_R = 1
          console.log(this.carta_activa_R)
          if (iniciar === true) {
            
          this.Pelea(equipo_R, equipo_N, filtro_R, filtro_N)
        }
        });
      }
      else {
        this.texto = "Eres el goat, ganaste"
        this.mostrar_cartas_html(true)
      }
        
      }
     
      if (equipo == "N") {
        if (iniciar === true){
          
            delete equipo_N[filtro_N.shift()]; // Elimina la carta en equipo_N
            
            
          }  
        
        if (Object.keys(equipo_N).length > 2) { 
          console.log(equipo_N)
        
        this.carta_activa_N =  equipo_N[filtro_N[0]]
        
        
        

      this.http.get(`${this.url}/mostrar_cartas/${this.carta_activa_N}`).subscribe((response2) => {
      console.log(response2);
      this.carta_activa_N = response2 
      this.hacker_N = 0
      this.vida_max_N = this.carta_activa_N.vida
       this.colorin_N = "success"
       this.progress_N = 1
      console.log(this.carta_activa_N)
      if (iniciar === true ){
        this.Pelea(equipo_R, equipo_N, filtro_R, filtro_N)
      }
    });
    }
    else {
      this.texto = 'Has perdido, <s>suerte</s> la proxima, noob';
      this.mostrar_cartas_html(false)
    }
  }
  this.cartas_restantes_N = Object.keys(equipo_N).length -2
  this.cartas_restantes_R = Object.keys(equipo_R).length -2
}

mostrar_cartas_html(ganaste_o_no: boolean){

setTimeout(() => {

if (ganaste_o_no === true) {
  this.http.get(`${this.url}/info/Bot${this.nivel}`).subscribe((response2) => {
    console.log(response2);
    this.gemas = response2
    this.gemas = this.gemas.gemas
    this.html = false
    this.claim = true
    
  });

}
else {
this.html = false
this.botones = false
this.PeleaBotoncitos = false;
}
}, 3000);
}
volver_home() {
 

  this.router.navigate(['/home',]);
}

Claim() {
let Data = {
  gemas: this.gemas,
  user: this.user.user
}
this.http.post(`${this.url}/gemas`, Data).subscribe((response) => {
  console.log(response);
  this.claim = false
  this.botones = false
this.PeleaBotoncitos = false;
});

}



}