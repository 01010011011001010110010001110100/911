import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { NavController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    CommonModule
  ],
})
export class EventDetailPage implements OnInit {
  event: any = null;

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.event = await this.dbService.getEventById(id);
  }

  back() {
    this.navCtrl.back();
  }
}
