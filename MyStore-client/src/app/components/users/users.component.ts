import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [TableModule, ButtonModule, NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  action: string;
  users: User[];
  showDelete: boolean = false;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ){}

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    })

    this.activatedRoute.queryParams.subscribe(params=>{
      if(params['action']){
        this.action = params['action'];
        if(this.action == 'delete')
          this.showDelete = true;
      }
    });
  } 

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.userService.getAllUsers().subscribe(users => {
        this.users = users;
      })
      },
      error: err => console.error("Failed to delete user", err)
    });
  }

}
