import { Component, OnInit } from '@angular/core';
//primeNg ייבוא עיצובים מ
import { AutoComplete } from 'primeng/autocomplete';
import { FloatLabel } from 'primeng/floatlabel';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';

import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgClass } from '@angular/common';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [NgClass, ReactiveFormsModule, AutoComplete, FloatLabel, RouterLink, Dialog, ButtonModule, InputTextModule, Message],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  userNotFound: boolean = false;
  visible: boolean = false;

  // טופס הכניסה
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private userService:UserService, private router : Router){};
  
  ngOnInit(): void {
    this.showDialog()
  };

  // פונקציית שליחת הטופס
  loginSubmit = ():void =>{
    const username = this.loginForm.get('username')?.value;
    const email = this.loginForm.get('email')?.value;
    this.userService.login(username, email).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        this.userService.getUserByUsernameEmail(username, email).subscribe({
          next: (user) => {
            this.userService.setCurrentUser(user);
            this.router.navigate(['products']);
          },
          error: () => {
            this.userNotFound = true;
          }
        });
      },
      error: () => {
        this.userNotFound = true;
      }
    });
  }

  // פתיחת/סגירת הטופס
  showDialog() {
      this.visible = true;
  }
  closeDialog() {
      this.visible = false;
      this.router.navigate([''])
      // ניתוב לדף הבית/דף קודם
  }
}
