import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  public allStudents: StudentInterface[] = []

  ngOnInit() {
    // Get all students from localStorage
    this.allStudents = JSON.parse(localStorage['students_'])

  }
}
