import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

// Interface for student sign up
interface StudentInterface {
  firstname: string,
  lastname: string,
  matricno: string,
  department: string,
  email: string,
  password: string,
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  // Inject student service to utilize the styles
  constructor(public service: StudentService, public route: Router) { }

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
  public errMsg = ''

  // Initialize empty array to store all students
  public allStudents: StudentInterface[] = []

  // Execute on initialization
  ngOnInit() {
    // Get form styles from StudentService
    this.inputStyles = this.service.inputStyle()
    this.btnStyles = this.service.btnStyle()

    // Get userArray from localStorage if it exists
    if (localStorage['students_']) {
      this.allStudents = JSON.parse(localStorage['students_'])
      console.log(this.allStudents);
    }
    else {
      console.log("No user found");
    }
  }

  // Function to handle student sign up
  handleRegister() {
    // Check to ensure all fields are field
    if (this.first_name != '' && this.last_name != '' && this.matric_no != '' && this.department != '' && this.email != '' && this.password != '') {
      // Store form data into object
      const student: StudentInterface = {
        firstname: this.first_name,
        lastname: this.last_name,
        matricno: this.matric_no,
        department: this.department,
        email: this.email,
        password: this.password
      }
      // console.log(student)
      // Store student data in an array
      let saveStudent = this.allStudents.push(student)

      // Push to localStorage
      localStorage.setItem('students_', JSON.stringify(this.allStudents))

      // Navigate to sigin page if user is saved
      if (saveStudent) {
        // this.route.navigate(['/login'])
        console.log('Student saved');
        
      }
      else {
        // Get error style from FormService and display error message
        this.errStyles = this.service.errorMessage()
        this.errMsg = 'Registration failed!'

        // Remove error message after 3 seconds
        setTimeout(() => {
          this.errStyles = ''
          this.errMsg = ''
        }, 3000);
      }
    }
    else {
      // Get error style from FormService and display error message
      this.errStyles = this.service.errorMessage()
      this.errMsg = 'Kindly fill all fields correctly!'

      // Remove error message after 3 seconds
      setTimeout(() => {
        this.errStyles = ''
        this.errMsg = ''
      }, 3000);
    }
  }

}
