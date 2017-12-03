import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'

// storage is not yet available in angularfire2 library
// i used firebase platform to use storage feature
import * as firebase from 'firebase';

// i used lodash to decrease lines of code
import * as _ from 'lodash';


class Upload {

  file: File;
  // these three is optional
  name: string;
  url: string;
  progress: number;

  constructor(file: File) {
    // this is important
    // in here the this.file consumes file api
    // search google for more info in file api
    this.file = file;
  }

}


@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  uploads: Observable<any> | AngularFireList<any>;
  uploadReference: AngularFireList<any>;

  // FileList is used to contain the file interface (file api)
  selectedFiles: FileList;

  // upload class is used as interface for reference
  currentUpload: Upload;

  constructor(private db: AngularFireDatabase) {
    // in firebase console, visit uploads collection
    // you should know this by now, review realtimedb component for reference
    this.uploadReference = this.db.list<any>('uploads');
  }

  ngOnInit() {
    // in firebase console, visit uploads collection
    // review realtimedb component for reference
    this.uploads = this.uploadReference.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  // this function is prompted to select files in your computer
  onDetectFiles(event): void {
    this.selectedFiles = event.target.files;
  }

  onUpload(): void {
    // initialize files/file that were selected to uplaod
    let files = this.selectedFiles;

    // if there are no files selected exit this function
    if (_.isEmpty(files)) return;

    // initializez array of size n (n == the number of files selected from your computer)
    let filesIndex = _.range(files.length);

    // for each
    _.each(filesIndex, (index) => {
      // basic javascript from here
      this.currentUpload = new Upload(files[index]);

      // push upload, refer to the function after onUpload function
      this.pushUpload(this.currentUpload);
    });
  }

  pushUpload(upload: Upload) {
    // initialize storage reference
    const storageRef = firebase.storage().ref();

    // creates a file reference inside uploads folder in storage
    //          storageRef.child(`uploads/${upload.file.name}`)
    // upload the file, with the files selected from your computer,
    // file name of the file, url generated of the file contained in the firebase cloud,
    // and the progress (in this example i excluded progress)
    //          .put(upload.file)
    const uploadTask = storageRef.child(`uploads/${upload.file.name}`).put(upload.file);

    uploadTask.on('state_changed',
      (snapshot: firebase.storage.UploadTaskSnapshot) => {

        // creation of the 'uploads' folder in the cloud
        // and uploading happens here

      }, (error) => {
        // basic javascsript
        // logs the errors, if there are any
        console.log(error)
      }, () => {
        // line of execution enters here if there are no errors of 'success'

        // uploadTask.snapshot.downloadURL - url generated of the file contained in the firebase cloud
        upload.url = uploadTask.snapshot.downloadURL

        // upload.file.name -  the file name of the uploaded file
        upload.name = upload.file.name

        // push to realtimedb
        // no need to explain.. please refer to the realtimedb component
        this.db.list(`uploads/`).push(upload);
      }
    );
  }

  onDownload(url: string): void {
    // basic javascsript
    // since i have no knowledge in cors eto muna
    //
    window.open(url, '_blank')
  }

  onRemove(name: string, key: string): void {
    // delete file in realtimedb
    this.db.list(`uploads/`).remove(key);

    // this is required, reference ot storage could
    const storageRef = firebase.storage().ref();
    // delete file in storage cloud
    storageRef.child(`uploads/${name}`).delete()
  }


}
