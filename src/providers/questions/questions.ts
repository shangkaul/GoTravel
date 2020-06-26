import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the QuestionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionsProvider {
  ques = [];
  constructor(public http: HttpClient) {
    console.log('Hello QuestionsProvider Provider');
  }


  get() {
    this.http.get("https://valuetravel.herokuapp.com/book").subscribe(res => {
      // console.log(res.json());
    })
  }

}
