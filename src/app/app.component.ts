import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShellComponent } from './components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShellComponent],
  template: '<router-outlet/>',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'takehome-angular';
}
