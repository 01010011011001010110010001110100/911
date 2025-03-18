import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    CommonModule
  ],
})
export class Tab1Page implements OnInit {
  events: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}

  async ngOnInit() {
    await this.dbService.initDB();
    this.loadEvents();
  }

  async loadEvents() {
    this.events = await this.dbService.getEvents();
  }

  async ionViewWillEnter() {
    await this.loadEvents();
  }

  viewEventDetail(id: number) {
    this.router.navigate(['/event-detail', id]);
  }
}
