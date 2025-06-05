import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { WishlistService } from '../../services/wishlist.service';
import { ProductComponent } from "../product/product.component";
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [RouterOutlet, ProductComponent, NgIf, NgFor],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  wishlist: Product[];

  constructor( private wishlistService: WishlistService ){};
  
  ngOnInit(): void {
    this.wishlistService.wishlist$.subscribe(wishlist => {
      this.wishlist = wishlist;
    })
  };
}
