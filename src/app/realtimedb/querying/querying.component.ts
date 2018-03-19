import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AngularFireDatabase, AngularFireList, DatabaseReference } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-querying',
  templateUrl: './querying.component.html',
  styleUrls: ['./querying.component.scss']
})
export class QueryingComponent implements OnInit {

  cityOrderByForm: FormGroup;
  states: Observable<any>;
  stateReference: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    // initialize 'states' collection to reference
    this.stateReference = this.db.list<any>('states_query');
  }

  ngOnInit() {
    // snapshotChanges is used to read documents from the collection 'states_query'
    // this.states is used in the html to for loop the docuemnts and its properties
    // placed in ngOnInit for the this.states to contain immediately the states_query collection
    this.states = this.stateReference.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    // form init
    this.cityOrderByForm = new FormGroup({
      'child': new FormControl(null),
      'equal': new FormControl(null),
      'limit': new FormControl(null)
    });
  }


  // SORTING

  queryOrderByKey() {
    const list = this.db.list<any>('states_query', (query: DatabaseReference) => {
      // sort the list by key, in ascending order
      return query.orderByKey();
    });

    // see mapNewChanges under the helper functions comment
    this.states = this.mapNewChanges(list);
  }

  queryOrderByChild() {
    const child = this.cityOrderByForm.value.child;
    const list = this.db.list<any>('states_query', (query: DatabaseReference) => {
      // sort key values in ascending order for number, alphabetical order for string and starts with false if boolean
      return query.orderByChild(child);
    });

    // see mapNewChanges under the helper functions comment
    this.states = this.mapNewChanges(list);
  }


  // FILTERING

  queryEqualTo() {
    // child input form value
    const child = this.cityOrderByForm.value.child;
    // equal input form value
    const equal = this.cityOrderByForm.value.equal;
    // parses the input value to string, if number or boolean
    // see the function below the helper functions section
    const parsedEqual = this.parseEqual(equal);

    const list = this.db.list<any>('states_query', (query: DatabaseReference) => {
      // sorts child by value
      return query.orderByChild(child).equalTo(parsedEqual);
    });

    // see mapNewChanges under the helper functions comment
    this.states = this.mapNewChanges(list);
  }

  queryStartAt() {
    // child input form value
    const child = this.cityOrderByForm.value.child;
    // limit input form value
    const start = this.cityOrderByForm.value.limit;

    const list = this.db.list<any>('states_query', (query: DatabaseReference) => {
      // display and sorts numbers starts with specified values
      return query.orderByChild(child).startAt(start);
    });

    // see mapNewChanges under the helper functions comment
    this.states = this.mapNewChanges(list);
  }

  queryEndAt() {
    // child input form value
    const child = this.cityOrderByForm.value.child;
    // limit input form value
    const end = this.cityOrderByForm.value.limit;

    const list = this.db.list<any>('states_query', (query: DatabaseReference) => {
      // display and sorts numbers ends at specified values
      return query.orderByChild(child).endAt(end);
    });

    // see mapNewChanges under the helper functions comment
    this.states = this.mapNewChanges(list);
  }

  queryLimitToFirst() {
    // child input form value
    const child = this.cityOrderByForm.value.child;
    // limit input form value
    const limit = this.cityOrderByForm.value.limit;

    const list = this.db.list<any>('states_query', (query: DatabaseReference) => {
      // sorts values and displays the number of documents specified starting from the first document
      return query.orderByChild(child).limitToFirst(limit);
    });

    // see mapNewChanges under the helper functions comment
    this.states = this.mapNewChanges(list);
  }

  queryLimitToLast() {
    // child input form value
    const child = this.cityOrderByForm.value.child;
    // limit input form value
    const limit = this.cityOrderByForm.value.limit;

    const list = this.db.list<any>('states_query', (query: DatabaseReference) => {
      // sorts values and displays the number of documents specified starting from the last document
      return query.orderByChild(child).limitToLast(limit);
    });

    // see mapNewChanges under the helper functions comment
    this.states = this.mapNewChanges(list);
  }


  // helper functions

  private mapNewChanges(list: AngularFireList<any>) {

    // this.states = this.stateReference.snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });

    // read for display the queried documents
    return list.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  }

  private parseEqual(equal: string): boolean | number | string {
    let parsedEqual;
    parsedEqual = equal !== 'true' ? equal !== 'false' ? 'invalid' : false : true;
    parsedEqual = parsedEqual === 'invalid' ? Number(equal) ? Number(equal) : 'invalid' : parsedEqual;
    return parsedEqual = parsedEqual === 'invalid' ? String(equal) ? String(equal) : 'invalid' : parsedEqual;
  }

}
