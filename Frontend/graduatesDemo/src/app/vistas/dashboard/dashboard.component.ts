import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/conexion/api.service';

import { ListaGraduadosI } from '../../modelos/listaGraduados.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  graduados: ListaGraduadosI[];
  displayedColumns: string[] = ['year', 'sex', 'typeCourse', 'noGraduates', 'actions'];
  dataSource: MatTableDataSource<ListaGraduadosI>;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.graduados);

    this.getAllGraduates();
  }

  public getAllGraduates(){
    this.api.getAll().subscribe(x =>{
      this.dataSource.data = x;
    })
  }

}
