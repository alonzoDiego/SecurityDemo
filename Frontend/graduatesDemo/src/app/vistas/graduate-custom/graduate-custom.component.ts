import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/servicios/conexion/api.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ListaGraduadosI } from '../../modelos/listaGraduados.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-graduate-custom',
  templateUrl: './graduate-custom.component.html',
  styleUrls: ['./graduate-custom.component.css']
})
export class GraduateCustomComponent implements OnInit {

  constructor(private api: ApiService, private router: Router, private activeRoute: ActivatedRoute) { }

  formCreate = new FormGroup({
    id: new FormControl(null),
    year: new FormControl(null),
    typeCourse: new FormControl(''),
    graduates: new FormControl(null),
    sex: new FormControl('')
  })

  ngOnInit(): void {
  }

  onSubmit(form: ListaGraduadosI){
    this.api.addNewGraduate(form).subscribe(x =>{
      console.log(x);
    });
    this.onClose()
  }

  onClose(){
    this.router.navigate(['dashboard']);
  }

}
