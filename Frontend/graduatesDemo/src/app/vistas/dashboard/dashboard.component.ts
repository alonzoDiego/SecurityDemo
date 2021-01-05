import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../servicios/conexion/api.service';
import { AlertsService } from '../../servicios/alerts/alerts.service'

import { ListaGraduadosI } from '../../modelos/listaGraduados.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService, private router: Router, private alert: AlertsService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.graduados);

    this.getAllGraduates();
    this.subs = this.api.refreshTable.subscribe(() =>{
      this.getAllGraduates();
    })
    this.ngAfterViewInit();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  getAllGraduates(){
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
    if(confirm('Are you sure to delete this record ?')){
      this.api.deleteGraduate(row.id).subscribe(x =>{
        console.log(row.id);
      })
      this.alert.success('Successfully removed!!');
    }
  }

}
