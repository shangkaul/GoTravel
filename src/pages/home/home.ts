import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Content, ViewController, ToastController, List } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  @ViewChild(List, { read: ElementRef }) chatList: ElementRef; username: string = 'Shivang';
  message: string = '';
  messages = [{
    "username": "shangkaul", "message": "Hello"
  }, {
    "username": "Shivang",
    "message": "Bye"


  },
  {
    "username": "shangkaul", "message": "Hello how are you doing today shivang!!!!"
  }, {
    "username": "Shivang",
    "message": "Bye"


  },
  {
    "username": "shangkaul", "message": "Hello"
  }, {
    "username": "Shivang",
    "message": "Bye"


  },
  {
    "username": "shangkaul", "message": "Hello"
  }, {
    "username": "Shivang",
    "message": "Bye"


  },
  {
    "username": "shangkaul", "message": "Hello"
  }, {
    "username": "Shivang",
    "message": "Bye"


  }, {
    "username": "shangkaul", "message": "Hello"
  }, {
    "username": "Shivang",
    "message": "Bye"


  }
  ];
  send: boolean = false;
  dbb: any;
  private mutationObserver: MutationObserver;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private toastCtrl: ToastController) {
    // this.dbb = this.navParams.get("db");
    // if (this.dbb == undefined) {
    //   this.dbb = this.userid + this.pid;
    //   this._chatSubscription = this.db.list('/' + this.dbb).valueChanges().subscribe(data => {
    //     this.messages = data;
    //     // this.content.scrollToBottom(200);
    //   })
    // }
    // else {
    //   this._chatSubscription = this.db.list('/' + this.dbb).valueChanges().subscribe(data => {
    //     this.messages = data;
    //     // this.content.scrollToBottom(200);
    //   })
    // }
    // this.info();

  }
  ionViewWillEnter() {
    this.mutationObserver = new MutationObserver((mutations) => {
      this.content.scrollToBottom();
    });

    this.mutationObserver.observe(this.chatList.nativeElement, {
      childList: true
    });
    this.content.scrollToBottom(300);

  }
  info() {

    // this.data.previous_chat(this.pid, this.pusername, this.dbb).subscribe((res) => {
    //   console.log(res.json())

    // })

  }
  sendMessage() {
    if (this.message != '') {
      // this.db.list('/' + this.dbb).push({
      //   username: this.username,
      //   message: autolink(this.message),
      // }).then(() => {
      //   this.data.send_notification(this.pid, 0, 0, 0, this.message, this.dbb).subscribe(res => {
      //     console.log(res);
      //   })
      //   // this.content.scrollToBottom(200)
      //   this.message = '';
      // }
      // )
      console.log(this.message);
      this.messages.push({
        "username": this.username,
        "message": this.message
      });
    }
    this.content.scrollToBottom();
    this.message = '';
  }

}
