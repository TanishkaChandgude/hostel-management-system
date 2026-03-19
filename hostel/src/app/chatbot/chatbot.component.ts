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

  let question = this.userInput.toLowerCase().trim();

  if(!question) return;

  this.messages.push("You: " + this.userInput);

  // ✅ Greetings
  if(question.includes("hello") || question.includes("hi") || question.includes("hey")){
    this.messages.push("Bot: Hello! 👋 How can I help you with hostel services?");
  }

  // ✅ Asking chatbot name
  else if(question.includes("your name") || question.includes("who are you")){
    this.messages.push("Bot: I am your Hostel Assistant 🤖.");
  }

  // ✅ Hostel rules
  else if(question.includes("rules")){
    this.messages.push("Bot: Hostel rules include no loud music after 10 PM, maintain cleanliness, and follow discipline.");
  }

  // ✅ Gate timing
  else if(question.includes("timing") || question.includes("gate")){
    this.messages.push("Bot: Hostel gate closes at 10:30 PM.");
  }

  // ✅ Fees
  else if(question.includes("fees") || question.includes("fee")){
    this.messages.push("Bot: Hostel fee is ₹50,000 per year.");
  }

  // ✅ Staff info
  else if(question.includes("staff") || question.includes("warden")){
    this.messages.push("Bot: Warden: Mr. Sharma, Caretaker: Mr. Ravi.");
  }

  // ✅ Mess quality
  else if(question.includes("mess quality") || question.includes("food quality")){
    this.messages.push("Bot: Mess food is hygienic and prepared fresh daily 🍛.");
  }

  // ✅ Mess timing
  else if(question.includes("mess timing") || question.includes("food timing")){
    this.messages.push("Bot: Breakfast: 8 AM, Lunch: 1 PM, Dinner: 8 PM.");
  }

  // ✅ Maintenance
  else if(question.includes("maintenance") || question.includes("repair")){
    this.messages.push("Bot: You can raise a complaint in the complaints section for maintenance issues.");
  }

  // ✅ Complaints
  else if(question.includes("complaint")){
    this.messages.push("Bot: Go to the Complaints section and submit your issue. It will be resolved soon.");
  }

  // ✅ Leave
  else if(question.includes("leave")){
    this.messages.push("Bot: You can apply for leave from the Leave section in dashboard.");
  }

  // ✅ WiFi
  else if(question.includes("wifi") || question.includes("internet")){
    this.messages.push("Bot: WiFi is available in all rooms. Contact admin if facing issues.");
  }

  // ✅ Room cleaning
  else if(question.includes("cleaning") || question.includes("room cleaning")){
    this.messages.push("Bot: Rooms are cleaned twice a week by housekeeping staff.");
  }

  // ✅ Water supply
  else if(question.includes("water")){
    this.messages.push("Bot: 24/7 water supply is available in the hostel.");
  }

  // ✅ Electricity
  else if(question.includes("electricity") || question.includes("power")){
    this.messages.push("Bot: Power backup is available during outages.");
  }

  // ✅ Security
  else if(question.includes("security")){
    this.messages.push("Bot: Hostel has 24/7 security with CCTV surveillance.");
  }

  // ✅ Goodbye
  else if(question.includes("bye") || question.includes("goodbye")){
    this.messages.push("Bot: Goodbye! Have a nice day 😊");
  }

  // ❌ Default response
  else{
    this.messages.push("Bot: Sorry, I can only answer hostel-related questions.");
  }

  this.userInput = "";
}

}
