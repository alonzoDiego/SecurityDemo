import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../servicios/conexion/api.service';
import { AlertsService } from '../../../servicios/alerts/alerts.service'

import { ListaGraduadosI } from '../../../modelos/listaGraduados.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TokenService } from 'src/app/servicios/token/token.service';
import { MatDialog } from '@angular/material/dialog';
import { GraduateCustomComponent } from '../graduate-custom/graduate-custom.component';
import { GraduateEditComponent } from '../graduate-edit/graduate-edit.component';


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
  roles: string[];
  isAdmin = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService,
              private router: Router,
              private alert: AlertsService,
              private tokenService: TokenService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.graduados);

    this.getAllGraduates();
    this.subs = this.api.refreshTable.subscribe(() =>{
      this.getAllGraduates();
    })
    this.ngAfterViewInit();

    this.roles = this.tokenService.getAuthoritites();
    this.roles.forEach(role => {
      if(role === 'ROLE_ADMIN'){
        this.isAdmin = true
      }
    })
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
    const dialogSave = this.dialog.open(GraduateCustomComponent, {disableClose: true});
    dialogSave.afterClosed().subscribe(res => {
      if(res){
        this.subs = this.api.refreshTable.subscribe(() =>{
          this.getAllGraduates();
        })
      }
    })
  }

  onEdit(row){
    const dialogUpdate = this.dialog.open(GraduateEditComponent, {disableClose: true, data: row});
    dialogUpdate.afterClosed().subscribe(res => {
      if(res){
        this.subs = this.api.refreshTable.subscribe(() =>{
          this.getAllGraduates();
        })
      }
    })
    //this.router.navigate(['editar', row.id]);
  }

  onDelete(row){
    if(confirm('Are you sure to delete this record ?')){
      this.api.deleteGraduate(row.id).subscribe(x =>{
        this.alert.success('Successfully removed!!');
      }, err =>{
        this.alert.error('Fail removed!!');
      })
    }
  }

}
