import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-chatbot',
  templateUrl: './student-chatbot.component.html',
  styleUrls: ['./student-chatbot.component.css']
})
 export class StudentChatbotComponent
{

  @ViewChild('chatBox') chatBox!: ElementRef;

  userInput = "";
  messages: any[] = [];
  isOpen = false;
  botTyping = false;

  studentName = sessionStorage.getItem("name") || "Student";

  constructor(private http: HttpClient) {}

  toggleChat(){
    this.isOpen = !this.isOpen;
  }

  sendMessage(text?: string){

  const message = text || this.userInput;
  if(!message) return;

  const msg = message.toLowerCase();

  this.messages.push({ sender: 'user', text: message });
  this.userInput = "";
  this.botTyping = true;

  // =========================
  // LOCAL HYBRID RESPONSES
  // =========================

  if(msg.includes("leave")){
    this.reply("Go to Dashboard → Leave section → Apply Leave");
    return;
  }

  if(msg.includes("complaint") || msg.includes("issue")){
    this.reply("Go to Dashboard → Complaint section → New Complaint");
    return;
  }

  if(msg.includes("fees")){
    this.reply("Navigate to Dashboard → Fees section  to view your fees status.");
    return;
  }

  if(msg.includes("mess")){
    this.reply("Go to Dashboard → Mess section → View Menu. You can also see today’s mess menu from the left sidebar on the Dashboard. ");
    return;
  }

  if(msg.includes("room")){
    this.reply("Check the right sidebar on the Dashboard — your room number is displayed at the top.");
    return;
  }

  // =========================
  // AI FALLBACK
  // =========================

  this.http.post<any>('http://localhost:5050/chat', {
    message: message
  }).subscribe(res => {
    this.reply(res.reply);
  }, err => {
    this.reply("Server busy. Try again.");
  });

}

  reply(text:string){
    setTimeout(() => {
      this.botTyping = false;
      this.messages.push({ sender: 'bot', text });
      this.scrollToBottom();
    }, 800);
  }

  scrollToBottom(){
    setTimeout(() => {
      this.chatBox.nativeElement.scrollTop =
        this.chatBox.nativeElement.scrollHeight;
    }, 100);
  }
}
 
 
 // {

//   @ViewChild('chatBox') chatBox!: ElementRef;

//   userInput = "";
//   messages: any[] = [];
//   isOpen = false;
//   botTyping = false;

//   studentName = sessionStorage.getItem("name") || "Student";

//   constructor(private http: HttpClient) {}

//   toggleChat(){
//     this.isOpen = !this.isOpen;
//   }

//   sendMessage(text?: string){

//     const message = text || this.userInput;
//     if(!message) return;

//     const msg = message.toLowerCase();

//     this.messages.push({ sender: 'user', text: message });
//     this.userInput = "";

//     this.botTyping = true;

//     // 🎯 INTENT SYSTEM
//     const intents:any = {
//       greeting: ["hi","hello","hey"],
//       rules: ["rules"],
//       fees: ["fees","fee"],
//       wifi: ["wifi","internet"],
//       room: ["room"],
//       leave: ["leave","leaves"],
//       complaint: ["complaint","issue"],
//       mess: ["mess","food"]
//     };

//     const detected = Object.keys(intents).find(intent =>
//       intents[intent].some((word:string) => msg.includes(word))
//     );

//     // ✅ STATIC RESPONSES
//     if(detected === "greeting"){
//       this.reply(`Hi ${this.studentName}! 👋 How can I help you?`);
//     }

//     else if(detected === "rules"){
//       this.reply("Hostel rules: No loud music after 10 PM, maintain discipline.");
//     }

//     else if(detected === "fees"){
//       this.reply("Hostel fee is ₹50,000 per year.");
//     }

//     else if(detected === "wifi"){
//       this.reply("WiFi is available in all rooms.");
//     }

//     // ✅ DYNAMIC (BACKEND)
//     else if(["room","leave","complaint","mess"].includes(detected!)){
//       const email = sessionStorage.getItem("email");

//       this.http.post<any>('http://localhost:5050/chatbot', {
//         message: detected,
//         email: email,
//         role: 'student'
//       }).subscribe(res => {
//         this.reply(res.reply);
//       });
//     }

//     // ❌ DEFAULT
//     else{
//       this.reply("Sorry, I didn't understand. Try: room, leave, complaint, mess.");
//     }
//   }

//   reply(text:string){
//     setTimeout(() => {
//       this.botTyping = false;
//       this.messages.push({ sender: 'bot', text });
//       this.scrollToBottom();
//     }, 800);
//   }

//   scrollToBottom(){
//     setTimeout(() => {
//       this.chatBox.nativeElement.scrollTop =
//         this.chatBox.nativeElement.scrollHeight;
//     }, 100);
//   }
// }
