import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-chatbot',
  templateUrl: './admin-chatbot.component.html',
  styleUrls: ['./admin-chatbot.component.css']
})
export class AdminChatbotComponent {

  @ViewChild('chatBox') chatBox!: ElementRef;

  userInput = "";
  messages: any[] = [];
  isOpen = false;
  botTyping = false;

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

    const intents:any = {
      greeting: ["hi","hello"],
      complaints: ["complaint"],
      leaves: ["leave"],
      students: ["student"]
    };

    const detected = Object.keys(intents).find(intent =>
      intents[intent].some((word:string) => msg.includes(word))
    );

    if(detected === "greeting"){
      this.reply("Hello Admin 👋");
    }

    else if(["complaints","leaves","students"].includes(detected!)){

      this.http.post<any>('http://localhost:5050/chatbot', {
        message: detected,
        role: 'admin'
      }).subscribe(res => {
        this.reply(res.reply);
      });
    }

    else{
      this.reply("Try: complaints, leaves, students");
    }
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
