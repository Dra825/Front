import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.page.html',
  styleUrls: ['./cartas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,]
})
export class CartasPage implements OnInit {
public user!: any
public cartas!: any
public cargar_equipo !: any
public contador: number = 1
public contador2: number = 0
public contador3: number = 0
public contador4: number = 0
public carta_team: any = [{
  nombre: "",
  img: "",
}]
public items: any
public tiempo: any
public equipo: any
public nada: number = 3
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }
public url: string = 'http://localhost:3000'

  ngOnInit() {
    this.user = this.route.snapshot.params;
    this.http.get(`${this.url}/cartas/${this.user.user}`).subscribe((response) => {
      console.log(response);
      this.cartas = response
      console.log(this.carta_team)
    if(this.carta_team[0].nombre.length == 0){
     this.carta_team.shift()
    }
    console.log(this.carta_team)
    
    this.http.get(`${this.url}/equipo/${this.user.user}`).subscribe((response2) => {
      console.log(response2);
      this.cargar_equipo = response2
      console.log(this.cargar_equipo)

      this.http.get(`${this.url}/equipo_cargar/${this.cargar_equipo.carta_id1}/${this.cargar_equipo.carta_id2}/${this.cargar_equipo.carta_id3}/${this.cargar_equipo.carta_id4}/${this.cargar_equipo.carta_id5}`).subscribe((response3) => {
        console.log(response3);
        this.carta_team = response3
        while (this.contador3 <  5) {
        if (this.carta_team[this.contador3] === null) {
          this.carta_team.splice(this.contador3, 1);
        } else {
          console.log(this.cartas)
        let nombre = this.carta_team[this.contador3].nombre
        while (this.contador4 < this.cartas.length) {
          if (this.cartas[this.contador4].nombre == nombre) {
            this.cartas[this.contador4].cantidad--
          }
          this.contador4++
        }
        this.contador4 = 0
        this.contador3++
      }
        }
        console.log(this.carta_team)
      });
      
    });
    
    
  
   });
   this.http.get(`${this.url}/cargar_items/${this.user.user}`).subscribe((response5) => {
    console.log(response5);
    this.items = response5
 
});

this.http.get(`${this.url}/tiempo/${this.user.user}/Pocion_Pro`).subscribe((response7) => {
  console.log(response7);
  this.tiempo = response7

});

  }
  
 actualizar() {
  window.location.reload();
 }

  addCard(index: number, carta: any) {
    
    if (this.carta_team.length < 5 && carta.cantidad > 0) {
    carta.cantidad--
    console.log(index)
    console.log(carta)
    let team_carta = {
      nombre: carta.nombre,
      img: carta.img,
      cantidad: carta.cantidad

    }
    console.log(team_carta)
    this.carta_team.push(team_carta)
    console.log(this.carta_team)

   this.guardar_equipo()
  }
}
eliminar_team(index: number, carta: any){
  console.log(this.cartas)
    for (let cartita of this.cartas) {
      if (carta.nombre == cartita.nombre) {
        cartita.cantidad++
      }
    }
  this.carta_team.splice(index, 1);
  this.guardar_equipo()
}

guardar_equipo(){
  let info = {
    user: this.user.user,
    equipo: this.carta_team
  }

  this.http.post(`${this.url}/guardar_equipo`, info).subscribe((response) => {
    console.log("Guardando Equipo"); 
    console.log(response)
    this.equipo = response


  }); 
}
volver_home() {



  this.router.navigate(['/home',]);
}
Tomar_Equipar(index: number, item: any) {
  if (item.cantidad >= 1) {
  item.cantidad--

  let Data = {
    item: item.item_id,
    user: this.user.user
  }
  this.http.post(`${this.url}/tomar`, Data).subscribe((response) => {
    console.log(response)
    this.tiempo = response
    console.log(this.tiempo.tiempo)

  });
}
}
}