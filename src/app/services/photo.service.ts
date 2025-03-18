import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  async takePhoto(): Promise<string> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      const response = await fetch(image.webPath!);
      const blob = await response.blob();
      const fileName = `event_${new Date().getTime()}.jpeg`;

      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: await this.blobToBase64(blob),
        directory: Directory.Data,
      });

      const fileUrl = Capacitor.convertFileSrc(savedFile.uri);
      return fileUrl;
    } catch (error) {
      console.error('Error taking photo:', error);
      return '';
    }
  }

  async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}
