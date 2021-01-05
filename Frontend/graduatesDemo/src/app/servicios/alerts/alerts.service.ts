import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private snak: MatSnackBar) { }

  configuration: MatSnackBarConfig = {
    duration: 1000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  success(message){
    this.configuration['panelClass'] = ['notif-success'];
    this.snak.open(message, '', this.configuration);
  }

  error(message){
    this.configuration['panelClass'] = ['notif-warn'];
    this.snak.open(message, '', this.configuration);
  }
}
