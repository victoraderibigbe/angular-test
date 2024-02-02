import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

// Interface for admin sign up
interface AdminInterface {
  firstname: string,
  lastname: string,
  department: string,
  email: string,
  password: string,
  adminid: string
}

@Component({
  selector: 'app-admin-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-signup.component.html',
  styleUrl: './admin-signup.component.css'
})
export class AdminSignupComponent {
  // Inject student service to utilize the styles
  constructor(public service: StudentService, public route: Router) { }

  // Initialize properties to bind with input
  public first_name = ''
  public last_name = ''
  public department = ''
  public email = ''
  public password = ''

  // Initialize properties to store form styles
  public inputStyles = ''
  public btnStyles = ''

  // Initialize properties to display error messages and styles
  public errMsg = ''
  public errStyles = ''

  public admin_id = '' // Property for admin ID

  // Initialize empty array to store admin data
  public adminArray: AdminInterface[] = []

  // Execute on initialization
  ngOnInit() {
    // Get form styles from StudentService
    this.inputStyles = this.service.inputStyle()
    this.btnStyles = this.service.btnStyle()

    // Get userArray from localStorage if it exists
    if (localStorage['admin_']) {
      this.adminArray = JSON.parse(localStorage['admin_'])
      console.log(this.adminArray);
    }
    else {
      console.log('No user found');
    }
  }

  // Function to handle admin sign up
  handleRegister() {
    // Generate unique ID for admin
    this.admin_id = this.service.generateUniqueId();

    // Check to ensure all fields are field
    if (this.first_name != '' && this.last_name != '' && this.department != '' && this.email != '' && this.password != '') {
      // Store form data into object
      const admin: AdminInterface = {
        firstname: this.first_name,
        lastname: this.last_name,
        department: this.department,
        email: this.email,
        password: this.password,
        adminid: this.admin_id
      }
      // console.log(student)
      // Store student data in an array
      let saveAdmin = this.adminArray.push(admin)

      // Push to localStorage
      localStorage.setItem('admin_', JSON.stringify(this.adminArray))

      // Navigate to sigin page if user is saved
      if (saveAdmin) {
        this.route.navigate(['/adminlogin'])
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
