import { Component } from '@angular/core';
import { BoardComponent } from './board/board.component'; // Import BoardComponent
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // Mark AppComponent as standalone
  imports: [CommonModule, BoardComponent], // Import BoardComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VettyDashboard';
}