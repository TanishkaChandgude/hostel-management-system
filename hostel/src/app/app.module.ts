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
import { ChatbotComponent } from './chatbot/chatbot.component';
import { HeaderComponent } from './header/header.component';

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
    ChatbotComponent,
    HeaderComponent
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
