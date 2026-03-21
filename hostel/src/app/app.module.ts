import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { LeaveComponent } from './leave/leave.component';
import { RegisterComponent } from './register/register.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { ManageStudentsComponent } from './admin/manage-students/manage-students.component';
import { ManageComplaintsComponent } from './admin/manage-complaints/manage-complaints.component';
import { ManageLeavesComponent } from './admin/manage-leaves/manage-leaves.component';
import { RouterModule } from '@angular/router';
import { ManageNoticesComponent } from './admin/manage-notices/manage-notices.component';
import { NoticeComponent } from './notice/notice.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ManageFeedbackComponent } from './manage-feedback/manage-feedback.component';
import { StaffComponent } from './staff/staff.component';
import { MessComponent } from './mess/mess.component';
import { AdminMessComponent } from './admin/mess/mess.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AddRoomsComponent } from './add-rooms/add-rooms.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { StudentsComponent } from './students/students.component';
import { StudentChatbotComponent } from './student-chatbot/student-chatbot.component';
import { AdminChatbotComponent } from './admin/admin-chatbot/admin-chatbot.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    StudentDashboardComponent,
    ComplaintComponent,
    StudentLayoutComponent,
    LeaveComponent,
    RegisterComponent,
    AdminLayoutComponent,
    ManageStudentsComponent,
    ManageComplaintsComponent,
    ManageLeavesComponent,
    ManageNoticesComponent,
    NoticeComponent,
    HeaderComponent,
    FeedbackComponent,
    ManageFeedbackComponent,
    StaffComponent,
    MessComponent,
    AdminMessComponent,
    RoomsComponent,
    AddRoomsComponent,
    AddStaffComponent,
    StudentsComponent,
    StudentChatbotComponent,
    AdminChatbotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
