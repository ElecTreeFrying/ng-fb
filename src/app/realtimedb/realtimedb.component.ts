import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-realtimedb',
  templateUrl: './realtimedb.component.html',
  styleUrls: ['./realtimedb.component.scss']
})
export class RealtimedbComponent implements OnInit {

  stateForm: FormGroup;
  states: Observable<any>;
  stateReference: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    // initialize 'states' collection to reference
    this.stateReference = this.db.list<any>('states');
  }

  ngOnInit() {
    this.stateForm = new FormGroup({
      'key': new FormControl(null),
      'city': new FormControl(null),
      'zip': new FormControl(null),
      'mayor': new FormControl(null)
    })
  }

  // create document in 'states' collection
  // open firebase console to see changes
  createState(): void {
    // values of inputs in form
    const state = {
      city: this.stateForm.value['city'],
      zip: this.stateForm.value['zip'],
      mayor: this.stateForm.value['mayor']
    };

    // ipasok mo ipasok mo
    this.stateReference.push(state);

    // called to empty the inputs to prevent conflicts
    this.clearForm();
  }

  readState(): void {
    // alam mo na to basa lang to
    this.states = this.stateReference.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  updateState(): void {
    // basic angular lang to refer to the createState
    const key = this.stateForm.value['key'];
    const state = {
      city: this.stateForm.value['city'],
      zip: this.stateForm.value['zip'],
      mayor: this.stateForm.value['mayor']
    };

    // update langa to
    this.stateReference.update(key, state);

    // called to empty the inputs to prevent conflicts
    this.clearForm();
  }

  deleteState(option: string): void {
    // basic javascript
    option === 'all' ? this.removeAll() : this.removeBykey();
  }



  // helper functions

  removeBykey(): void {
    // basic angular
    const key = this.stateForm.value['key'];

    // remove by key
    this.stateReference.remove(key);

    // called to empty the inputs to prevent conflicts
    this.clearForm();
  }

  removeAll(): void {
    this.stateReference.remove();

    // called to empty the inputs to prevent conflicts
    this.clearForm();
  }

  clearForm(): void {
    this.stateForm.setValue({
      'key': '',
      'city': '',
      'zip': '',
      'mayor': ''
    });
  }

}
