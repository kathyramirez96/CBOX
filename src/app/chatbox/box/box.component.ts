import { Component, OnInit } from '@angular/core';
import { generarOfset } from 'src/app/funciones/FUNCIONES';
import { MostrarMensaje } from 'src/app/funciones/mensajes';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  constructor() { }
  main:boolean = !true;
  bloq:boolean = !false;
  desb:boolean = !false;
  recu:boolean = !false;
  sms:boolean = !false;
  cedula:string = "";
  clave:string = "";
  celular:string = "";
  
  ngOnInit(): void {
  }


  mostrarPagina(cod:number){
    this.cedula = "";
    this.clave = "";
    this.celular = "";
    localStorage.setItem("intento","0");
    this.main = !(1 === cod);
    this.bloq = !(2 === cod);
    this.desb = !(3 === cod);
    this.recu = !(4 === cod);
    this.sms = !(5 === cod);
  }


  bloquear(){
    //METODO PARA BLOQUEAR EN BASE
    if(this.cedula !== undefined && this.cedula !== null && this.cedula !== "" ){
      console.log(this.cedula);
      MostrarMensaje(`Cédula ${this.cedula} fue bloqueada`);
      this.mostrarPagina(1);
    }else{
      MostrarMensaje("Ingrese una cédula");
    }
  }

  enviarSMS(){
    //OBTENER TELEFONO DE BASE POR CÉDULA
    console.log(this.cedula);
    //METODO PARA CONSULTAR INFORMACION POR CÉDULA
    const tel = '0987654321';
    //GENERAR CLAVE TEMPORAL
    const clave = generarOfset();
    console.log(clave);
    //ALMACENAR clave en base
    localStorage.setItem("clave",clave);
    MostrarMensaje(`Se envió SMS a ${tel}`);
    this.mostrarPagina(5);
  }
  desbloquear(){
    const intento = localStorage.getItem("intento") || 0;
    //traer clave de base
    const clave = localStorage.getItem("clave");//traer de base 
    console.log(clave);
    console.log(this.clave);
    //Metodo para enviar clave por algun medio

    if(this.clave === clave){
      MostrarMensaje("Usuario desbloqueado");
      this.mostrarPagina(1);
    }
    else{
      this.clave = "";
      MostrarMensaje("La clave ingresada es incorrecta")
      if(+intento >= 2 ){
        MostrarMensaje("Intentos Superados");
        this.mostrarPagina(1);
      }else{
        localStorage.setItem("intento",""+(+intento+1));
      }
    }
    
  }

  recuperar(){
    const cel = this.celular;//consultar en base por celular
    if(cel !== undefined && cel !== null && cel !== "")
        MostrarMensaje(`Usuario enviado a ${cel}`);
    else
        MostrarMensaje("No se encontro el usuario");
    this.mostrarPagina(1);
  }

}
