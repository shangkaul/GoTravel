import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Content, ViewController, ToastController, List } from 'ionic-angular';
import { Http } from '@angular/http';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  @ViewChild(List, { read: ElementRef }) chatList: ElementRef;
  username: string;
  message: string = '';
  messages = [];
  json = {};
  send: boolean = false;
  disableit: boolean = false;
  dbb: any;
  isDisabled: boolean = false;
  butDisable: boolean = false;
  ques = [];
  resp = [];
  dat: Date;
  showanim: boolean = false;
  private mutationObserver: MutationObserver;
  selectedAnimation: any = "interactive";
  animations: any;
  interactive = false;
  anim: any;
  animationSpeed: number = 1;

  interactiveAnimationOption = {
    loop: true,
    prerender: false,
    autoplay: false,
    autoloadSegments: false,
    path: 'assets/anim/typing.json'
  }
  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
    private toastCtrl: ToastController, public http: Http) {

    this.intro();
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
  handleAnimation(anim: any) {
    this.anim = anim;
    this.anim.play();
    // this.anim.stop();
  }
  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  }
  intro() {

    this.pushmsg({
      "username": "bot",
      "message": "Welcome user what should I call you?"
    });


  }
  pushmsg(arg) {
    this.showanim = true;
    setTimeout(() => {
      this.showanim = false;
      this.messages.push(arg);
    }, 3000);
  }
  sendMessage() {
    if (this.message != '') {

      let body = {
        username: this.message,
        message: this.message,
        specialMessage: false
      }
      // this.http.post("https://valuetravel.herokuapp.com/messages", body).subscribe(res => {
      //   console.log(res.json);
      // });
      this.username = this.message;
      console.log(this.username);
      this.messages.push(body);
      this.isDisabled = true;
      this.butDisable = true;
    }
    this.content.scrollToBottom();
    this.message = '';
    this.flowSelect();
  }

  flowSelect() {
    let body = {
      username: 'bot',
      message: "So what do you want to do?",
      specialMessage: false,
      options: [{ opt: "Plan Itinerary" }, { opt: "Rate your stay" },
      { opt: "Bookings" }, { opt: "Meet the Developer" }, { opt: "Tell me a vacation joke?" },]
    }
    // console.log(body);
    this.pushmsg(body);
  }

  usermsg(opt) {
    // console.log(opt);
    this.resp.push(opt);
    this.disableit = true;
    console.log(opt);
    let body = {
      username: this.username,
      message: opt,
      specialMessage: false,
    };
    switch (opt) {
      case "Yes":
        // this.navCtrl.setRoot(HomePage);
        this.flowSelect();
        break;
      case "No":
        this.pushmsg({ username: "bot", message: "Thank you for using GoTravel bot! Bye bye :)" });

        break;
      case "Plan Itinerary":
        this.messages.push(body);
        this.http.get("https://valuetravel.herokuapp.com/itin").subscribe(res => {
          this.ques = res.json();
          this.dialogflow1(this.ques);
        })
        break;
      case "Rate your stay":
        this.messages.push(body);
        this.http.get("https://valuetravel.herokuapp.com/rate").subscribe(res => {
          this.ques = res.json();
          this.dialogflow1(this.ques);
        })

        break;
      case "Bookings":
        this.messages.push(body);
        this.http.get("https://valuetravel.herokuapp.com/book").subscribe(res => {
          this.ques = res.json();
          console.log(this.ques);
          this.dialogflow1(this.ques);
        })

        break;
      case "Meet the Developer":
        this.messages.push(body);
        this.pushmsg({
          username: "bot",
          message: "Meet the developer : Shivang Kaul. He is proficient in front end and backend javascript frameworks and has worked on various Full stack Development projects. Find him on github/Linkedin.",
          img: "https://media-exp1.licdn.com/dms/image/C5103AQFHw4VEGY-JfQ/profile-displayphoto-shrink_100_100/0?e=1598486400&v=beta&t=f5T255OHQsfyEclZhX2Dh9Lf0ZmtFRl2U1uSj4QFqKc"
        });
        this.exit([]);

        break;
      case "Tell me a vacation joke?":
        this.messages.push(body);

        this.pushmsg({
          username: "bot",
          message: "Due to Covid times, Travelling is not a joke. Stay home, Stay safe!"
        });
        this.exit([]);


        break;

      default:
        this.messages.push(body);
        this.dialogflow1(this.ques);

    }

    // if (opt == "Yes") {
    //   this.navCtrl.setRoot(HomePage);
    // }

    // else if (opt == "No") {
    //   this.messages.push({ username: "bot", message: "Thank you for using GoTravel bot! Bye bye :)" });
    // }

    // else if (opt == "Tell me a joke") {
    //   console.log("404 not found");
    // }
    // else {


    //   this.messages.push(body);
    //   this.dialogflow1(this.ques);

    // }
  }

  dialogflow1(ques) {
    if (ques.length == 0) {
      console.log(this.resp);
      this.exit(this.resp);
    }
    else {
      // console.log(ques[0]);
      let body = {
        username: "bot",
        message: ques[0].message,
        options: ques[0].options,
        cal: ques[0].cala
      }
      this.pushmsg(body);
      this.dat = null;
      this.dialogflow1(ques.shift());
    }

  }

  exit(resp) {
    this.http.post("https://valuetravel.herokuapp.com/messages", resp).subscribe(res => {
      console.log("ok");
    })


    let body = {
      username: "bot",
      message: "Thank you for using travel bot! Can I help you with something else?",
      options: [{ opt: "Yes" }, { opt: "No" }]
    }
    this.pushmsg(body);
  }
}
