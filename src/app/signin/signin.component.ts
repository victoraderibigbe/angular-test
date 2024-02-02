import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

// Interface for student sign in
interface AdminInterface {
  email: string,
  password: string,
  adminid: string
}

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  constructor(public service: StudentService, public route: Router) { }

  // Initialize properties to bind with input
  public email = ''
  public password = ''
  public admin_id = ''

  // Initialize properties to store form styles
  public inputStyles = ''
  public btnStyles = ''

  // Initialize properties to display error messages and styles
  public errStyles = ''
  public errMsg = ''

  // Initialize empty array to store all admin
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

  // Function to handle admin login
  handleLogin() {
    // Get current user that tries to sign in
    const currentAdmin = this.adminArray.find((admin) => this.email == admin.email && this.password == admin.password)

    // Check if user exixts and save user data to localStorage
    if (currentAdmin) {
      const adminId = currentAdmin.adminid // Get the current admin id
      localStorage.setItem('current_admin', JSON.stringify(currentAdmin))
      localStorage.setItem('admin_id', adminId)
      this.route.navigate(['/dashboard'])
    }
    else {
      // Get error style from FormService and display error message
      this.errStyles = this.service.errorMessage()
      this.errMsg = 'Incorrect details, user not found!'

      // Remove error message after 3 seconds
      setTimeout(() => {
        this.errStyles = ''
        this.errMsg = ''
      }, 3000);
    }
    
  }

}
