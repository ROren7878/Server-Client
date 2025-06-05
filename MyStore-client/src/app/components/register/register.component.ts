import { Component, OnInit } from '@angular/core';

import { AutoComplete } from 'primeng/autocomplete';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { NgClass } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [NgClass, RouterLink, FormsModule, AutoComplete, FloatLabel, ButtonModule, Dialog, ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  
  currentUser: User | null;
  
  userIsFound: boolean = false;
  visible: boolean = false;

  user:User = {
    id: 0,
    userName: '',
    Email: '',
    phone: '',
    city:'',
    street: '',
    house:0
  }

  constructor(
    private userService:UserService ,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ){};
  
  ngOnInit(): void {
    this.userService.getCurrentUser$().subscribe(user => {
      this.currentUser = user;
        if(this.currentUser){
      this.user = { ...this.currentUser }
      }
      this.showDialog()
    }); 
  }

  registerSubmit = (): void => {
    if(this.currentUser){
      this.userService.updateUser(this.user.id, this.user).subscribe({
        next: updatedUser => {
          this.userService.setCurrentUser(this.user);
            this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'פרופיל עודכן',
            life: 2000
          });

          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 3000);
        }
      });
    }
    else{
      const username = this.user.userName!;
      const email = this.user.Email!;

      this.userService.getUserByUsernameEmail(username, email).subscribe({
        next: existingUser => {
          this.userIsFound = true;
          // console.log('User already exists');
        },
        error: err => {
          // אם יש שגיאה (למשל 404), נניח שהמשתמש לא קיים ונרשום אותו:
          this.userIsFound = false;
          this.userService.addUser(this.user).subscribe({
            next: () => {
              this.userService.setCurrentUser(this.user);
              this.router.navigate(['products']);            
            },
            error: addErr => {
            }
          });
        }
      });
    }
  }

  // פתיחת/סגירת הטופס
  showDialog() {
      this.visible = true;
  }
  closeDialog() {
      this.visible = false;
      this.router.navigate([''])
      // ניתוב 
  }
}
