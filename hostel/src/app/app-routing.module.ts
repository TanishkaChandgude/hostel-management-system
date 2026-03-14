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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
 
  {
path:'student',
component:StudentLayoutComponent,
children:[
 { path:'leave', component: LeaveComponent },
{ path:'student-dashboard', component: StudentDashboardComponent },
{ path:'complaint', component: ComplaintComponent },
{path:'notice', component:NoticeComponent} ]},
{
  path:'admins',
  component:AdminLayoutComponent,
  children:[
    {path:'dashboard',component:AdminDashboardComponent},
    {path:'students',component:ManageStudentsComponent},
    {path:'complaints',component:ManageComplaintsComponent},
    {path:'leaves',component:ManageLeavesComponent},
    {path:'notices',component:ManageNoticesComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
