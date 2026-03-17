import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {

  userInput = "";
  messages: string[] = [];

  isOpen = false;

  toggleChat(){
    this.isOpen = !this.isOpen;
  }

  sendMessage(){

    let question = this.userInput.toLowerCase();

    this.messages.push("You: " + this.userInput);

    if(question.includes("rules")){
      this.messages.push("Bot: Hostel rules are no loud music after 10 PM.");
    }

    else if(question.includes("timing")){
      this.messages.push("Bot: Hostel gate closes at 10:30 PM.");
    }

    else if(question.includes("fees")){
      this.messages.push("Bot: Hostel fee is ₹50,000 per year.");
    }

    else if(question.includes("staff")){
      this.messages.push("Bot: Warden: Mr. Sharma. Caretaker: Mr. Ravi.");
    }

    else{
      this.messages.push("Bot: Sorry, I can only answer hostel related questions.");
    }

    this.userInput = "";
  }

}
