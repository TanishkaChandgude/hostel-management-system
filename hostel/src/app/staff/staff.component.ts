import { Component } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent {

  staffList = [
    {
      name: 'Mrs. Baravkar',
      role: 'Warden',
      phone: '9876543210',
      email: 'warden@hostel.com'
    },
    {
      name: 'Mr. Patil',
      role: 'Mess Manager',
      phone: '9123456780',
      email: 'mess@hostel.com'
    },
    {
      name: 'Mr. Jadhav',
      role: 'Security',
      phone: '9988776655',
      email: 'security@hostel.com'
    },
    {
      name: 'Mr. Joshi',
      role: 'Maintenance',
      phone: '9012345678',
      email: 'maintenance@hostel.com'
    }
  ];

  // ✅ WhatsApp Function (with message)
  openWhatsApp(phone: string) {
    const message = "Hello Sir/Ma'am, I need help regarding hostel.";
    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }

}