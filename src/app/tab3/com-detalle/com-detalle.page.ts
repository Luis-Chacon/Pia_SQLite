import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comentario } from 'src/app/model/Comentarios.models';
import { ComentariosService } from 'src/app/Services/comentarios.service';

@Component({
  selector: 'app-com-detalle',
  templateUrl: './com-detalle.page.html',
  styleUrls: ['./com-detalle.page.scss'],
})

export class ComDetallePage implements OnInit {

  comentarios: Comentario;
  
  datosForm: FormGroup;
  
  mensajesVal = {
    datos: [
      {type:"required", message: "Por favor llene el dato completo."},
      {type:"pattern", message: "Por favor use carácteres válidos."},
    ]
  }

  constructor
  (
    private db:ComentariosService,
    private formBuilder: FormBuilder, 
    private com:ComentariosService,
    private router: Router
  ) 
  { 
    this.datosForm = this.formBuilder.group({

      userName : new FormControl("", Validators.compose([

        Validators.required,

        Validators.pattern("^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$")

      ])),
      titulo : new FormControl("", Validators.compose([

        Validators.required,

        Validators.pattern("^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$")

      ])),
      resena : new FormControl("", Validators.compose([

        Validators.required,

        Validators.pattern("^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$")

      ]))
      }
    )
  }

  ngOnInit() {
  }

  addComent(datos)
  {
    this.com.addComenInput(datos);
    this.router.navigateByUrl("/");
  }

  storeData()
  {
    this.db.addComentarios(
      this.datosForm.value.userName,
      this.datosForm.value.titulo,
      this.datosForm.value.resena
    ).then((res) => {
      this.datosForm.reset();   //Posiblemnte borre los datos del forms una vez se le de al boton de guardar
    })
  }

  getBackButtonText() {

    const win = window as any;

    const mode = win && win.Ionic && win.Ionic.mode;

    return mode === 'ios' ? 'Inbox' : '';

  }

}
