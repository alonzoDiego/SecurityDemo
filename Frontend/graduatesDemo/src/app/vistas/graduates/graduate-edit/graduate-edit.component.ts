import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/conexion/api.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ListaGraduadosI } from '../../../modelos/listaGraduados.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router'
import { AlertsService } from 'src/app/servicios/alerts/alerts.service';

@Component({
  selector: 'app-graduate-edit',
  templateUrl: './graduate-edit.component.html',
  styleUrls: ['./graduate-edit.component.css']
})
export class GraduateEditComponent implements OnInit {

  graduate: ListaGraduadosI

  constructor(private api: ApiService, private router: Router, private activeRoute: ActivatedRoute, private alert: AlertsService) { }

  formEdit = new FormGroup({
    id: new FormControl(null),
    year: new FormControl(null, Validators.required),
    typeCourse: new FormControl('', Validators.required),
    graduates: new FormControl(null, Validators.required),
    sex: new FormControl('', Validators.required)
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
    if(this.formEdit.valid){
      this.api.putGraduate(form).subscribe(x =>{
        console.log(x);
      });
      this.onClose()
      this.alert.success('Successfully edited!!')
    }else{
      this.alert.error('Its necessary to fill the fields!')
    }
  }

  onClose(){
    this.router.navigate(['dashboard']);
  }

}
