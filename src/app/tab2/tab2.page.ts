import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { PhotoService } from '../services/photo.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonDatetime,
  IonInput,
  IonTextarea,
  IonButton,
  IonThumbnail
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonDatetime,
    IonInput,
    IonTextarea,
    IonButton,
    IonThumbnail,
    CommonModule,
    FormsModule
  ],
})
export class Tab2Page {
  event = {
    date: new Date().toISOString(),
    title: '',
    description: '',
    photo: '',
  };

  constructor(
    private dbService: DatabaseService,
    private photoService: PhotoService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  async takePhoto() {
    const photoPath = await this.photoService.takePhoto();
    if (photoPath) {
      this.event.photo = photoPath;
    }
  }

  async addEvent() {
    if (!this.event.title || !this.event.description || !this.event.date) {
      return;
    }

    await this.dbService.addEvent(
      this.event.date,
      this.event.title,
      this.event.description,
      this.event.photo
    );
    this.navCtrl.back();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
