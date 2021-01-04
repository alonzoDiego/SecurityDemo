import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/conexion/api.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ListaGraduadosI } from '../../modelos/listaGraduados.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-graduate-edit',
  templateUrl: './graduate-edit.component.html',
  styleUrls: ['./graduate-edit.component.css']
})
export class GraduateEditComponent implements OnInit {

  graduate: ListaGraduadosI

  constructor(private api: ApiService, private router: Router, private activeRoute: ActivatedRoute) { }

  formEdit = new FormGroup({
    id: new FormControl(null),
    year: new FormControl(null),
    typeCourse: new FormControl(''),
    graduates: new FormControl(null),
    sex: new FormControl('')
  });

  ngOnInit(): void {
    let graduadoId = this.activeRoute.snapshot.paramMap.get('id');
    this.api.getGraduate(graduadoId).subscribe(x =>{
      this.graduate = x;
      this.formEdit.setValue({
        'id': this.graduate.id,
        'year': this.graduate.year,
        'typeCourse': this.graduate.typeCourse,
        'graduates': this.graduate.graduates,
        'sex': this.graduate.sex
      })
    });
  }

  onSubmit(form: ListaGraduadosI){
    this.api.putGraduate(form).subscribe(x =>{
      console.log(x);
    });
  }

  onClose(){
    this.router.navigate(['dashboard']);
  }

}
