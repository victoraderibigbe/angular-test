import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }

  inputStyle() {
    let form_input = 'w-full h-16 border border-slate-400 my-3 outline-none px-3 text-xl rounded-lg focus-within:border-2 focus-within:border-slate-800 transition'
    return form_input;
  }

  btnStyle() {
    let form_btn = 'w-full bg-slate-800 h-16 text-white text-xl font-semibold rounded-lg transition hover:opacity-80'
    return form_btn;
  }

  errorMessage() {
    let err_msg = 'w-full h-16 bg-red-100 border-2 border-red-500 rounded-lg text-lg text-red-500 text-center font-semibold flex items-center justify-center'
    return err_msg;
  }

  successMessage() {
    let successMsg = 'w-full h-16 bg-green-100 border-2 border-green-500 rounded-lg text-lg text-green-500 text-center font-semibold flex items-center justify-center'
    return successMsg;
  }

  generateUniqueId(): string {
    // Create a random number and convert it to a hexadecimal string
    const randomHex = Math.random().toString(16).substring(2, 10);

    // Get the current timestamp in milliseconds
    const timestamp = new Date().getTime().toString(16);

    // Combine the randomHex and timestamp to create a unique ID
    const uniqueId = randomHex + timestamp;

    return uniqueId;
  }
}
