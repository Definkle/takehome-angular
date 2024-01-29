import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RoutesConfig } from '../../utils/constants/routes-config';
import { NavButtonComponent } from './nav-button/nav-button.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatToolbar, NavButtonComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  readonly routesData = RoutesConfig;
}
