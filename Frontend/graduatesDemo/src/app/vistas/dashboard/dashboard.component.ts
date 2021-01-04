import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/conexion/api.service';

import { ListaGraduadosI } from '../../modelos/listaGraduados.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  graduados: ListaGraduadosI[];
  displayedColumns: string[] = ['year', 'sex', 'typeCourse', 'noGraduates', 'actions'];
  dataSource: MatTableDataSource<ListaGraduadosI>;
  subs: Subscription;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.graduados);

    this.getAllGraduates();
    this.subs = this.api.refreshTable.subscribe(() =>{
      this.getAllGraduates();
    })
  }

  public getAllGraduates(){
    this.api.getAll().subscribe(x =>{
      this.dataSource.data = x;
    })
  }

  onCreate(){
    this.router.navigate(['nuevo']);
  }

  onEdit(row){
    this.router.navigate(['editar', row.id]);
    console.log(row.id);
  }

  onDelete(row){
    if(confirm('Estas seguro de eliminar este registro ?')){
      this.api.deleteGraduate(row.id).subscribe(x =>{
        console.log(row.id);
      })
    }
  }

}
