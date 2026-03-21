import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
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
import { ManageNoticesComponent } from './admin/manage-notices/manage-notices.component';
import { NoticeComponent } from './notice/notice.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { StaffComponent } from './staff/staff.component';
import { MessComponent } from './mess/mess.component';
import { AdminMessComponent } from './admin/mess/mess.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AddRoomsComponent } from './add-rooms/add-rooms.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { StudentsComponent } from './students/students.component';
import { ManageFeedbackComponent } from './manage-feedback/manage-feedback.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  
  { path:'student', component:StudentLayoutComponent,
  children:[
  { path: '', redirectTo: 'student-dashboard', pathMatch: 'full' },
  { path:'leave', component: LeaveComponent },
  { path:'student-dashboard', component: StudentDashboardComponent },
  { path:'complaint', component: ComplaintComponent },
  { path:'notice', component:NoticeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'staff', component: StaffComponent }, 
  { path: 'mess', component: MessComponent},

  ]},
   
  { path:'admins', component:AdminLayoutComponent,
  children:[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path:'dashboard',component:AdminDashboardComponent},
    {path:'students',component:ManageStudentsComponent},
    {path:'complaints',component:ManageComplaintsComponent},
    {path:'leaves',component:ManageLeavesComponent},
     {path:'feedbacks',component:ManageFeedbackComponent},
    {path:'notices',component:ManageNoticesComponent},
    {path:'register',component: RegisterComponent },
    {path: 'login', component: LoginComponent },
    {path: 'mess', component: AdminMessComponent},
    {path :'rooms',component:RoomsComponent},
    {path :'addrooms',component:AddRoomsComponent},
     {path :'addstaff',component:AddStaffComponent},
     {path :'view',component:StudentsComponent}

  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
