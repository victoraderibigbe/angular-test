import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public route: Router, public service: StudentService) { }

  // Initialize properties to bind with input
  public first_name = ''
  public last_name = ''
  public matric_no = ''
  public department = ''
  public email = ''
  public password = ''

  // Initialize properties to store form styles
  public inputStyles = ''
  public btnStyles = ''

  // Initialize properties to display error messages and styles
  public errStyles = ''
  public successStyles = ''
  public errMsg = ''
  public successMsg = ''

  public allStudents: StudentInterface[] = []

  ngOnInit() {
    // Get form styles from StudentService
    this.inputStyles = this.service.inputStyle()
    this.btnStyles = this.service.btnStyle()

    // Get all students from localStorage
    this.allStudents = JSON.parse(localStorage['students_'])

    // Loop through allStudents array and populate the update form input
    this.allStudents.map((student) => {
      this.first_name = student.firstname
      this.last_name = student.lastname
      this.matric_no = student.matricno
      this.department = student.department
      this.email = student.email
      this.password = student.password
    })

  }
public id: number = 0
  // Function to handle admin logout
  handleLogout() {
    localStorage.removeItem('current_admin')
    localStorage.removeItem('admin_id')
    this.route.navigate(['/adminlogin'])
  }

  openEdit(i:number) {
    this.id= i
  }

  // Function to handle student data update
  handleUpdate() {
    const students: StudentInterface = {
      firstname: this.first_name,
      lastname: this.last_name,
      matricno: this.matric_no,
      department: this.department,
      email: this.email,
      password: this.password
    }
    // console.log(students);
    this.allStudents.splice(this.id, 1, students)
    localStorage.setItem('students_', JSON.stringify(this.allStudents))
    window.location.reload()

  }

  // Function to handle delete
  handleDelete(i: number) {
    this.allStudents.splice(i, 1)
    localStorage.setItem('students_', JSON.stringify(this.allStudents))
    window.location.reload()
  }
}
