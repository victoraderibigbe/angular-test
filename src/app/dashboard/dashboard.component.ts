import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Interface for student details
interface StudentInterface {
  firstname: string,
  lastname: string,
  matricno: string,
  department: string,
  email: string,
  password: string,
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public route:Router) {}

  public allStudents: StudentInterface[] = []

  ngOnInit() {
    // Get all students from localStorage
    this.allStudents = JSON.parse(localStorage['students_'])

  }

  handleLogout() {
    localStorage.removeItem('current_admin')
    localStorage.removeItem('admin_id')
    this.route.navigate(['/adminlogin'])
  }
}
