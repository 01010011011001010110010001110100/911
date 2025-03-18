import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './services/database.service';
import {
  IonApp,
  IonRouterOutlet
} from '@ionic/angular/standalone';
import { StatusBar } from '@capacitor/status-bar';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonRouterOutlet
  ],
})
export class AppComponent implements OnInit {
  constructor(
    private sqliteService: DatabaseService
  ) { }

  async ngOnInit() {
    await this.sqliteService.initDB();
    try {
      await StatusBar.hide();
    } catch (error) {
      console.error('Error ocultando la barra de estado', error);
    }
  }
}