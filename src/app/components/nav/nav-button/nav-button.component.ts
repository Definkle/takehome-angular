import { Component, Input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [MatIconButton, MatIcon, RouterLink],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss',
})
export class NavButtonComponent {
  @Input() ariaLabel = '';
  @Input() routerLink = '';
  @Input() matIcon = '';
}
