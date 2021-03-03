import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/conexion/api.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ListaGraduadosI } from '../../../modelos/listaGraduados.interface';
import { Router, ActivatedRoute } from '@angular/router'
import { AlertsService } from 'src/app/servicios/alerts/alerts.service';

@Component({
  selector: 'app-graduate-custom',
  templateUrl: './graduate-custom.component.html',
  styleUrls: ['./graduate-custom.component.css']
})
export class GraduateCustomComponent implements OnInit {

  constructor(private api: ApiService, private router: Router, private alert: AlertsService) { }

  formCreate = new FormGroup({
    id: new FormControl(null),
    year: new FormControl(null, Validators.required),
    typeCourse: new FormControl('', Validators.required),
    graduates: new FormControl(null, Validators.required),
    sex: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
  }

  onSubmit(form: ListaGraduadosI){
    if(this.formCreate.valid){
      this.api.addNewGraduate(form).subscribe(x =>{
        console.log(x);
        this.alert.success('Successfully saved!!')
      }, err =>{
        this.alert.error('Fail saved!!')
      });
    }else{
      this.alert.error('Its necessary to fill the fields!')
    }
  }

}
