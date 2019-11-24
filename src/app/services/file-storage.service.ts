import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Thing } from '../core/interfaces/fishing_tackle/thing';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  public uploadPercent: Observable<number>;
  public downloadURL: Observable<string>;
  
  constructor(private storage: AngularFireStorage) { }

  uploadRod(thing: Thing) {
    const file = thing.imageUrl;
    const filePath = 'Rods/' + thing.userId;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe();
  }
}
