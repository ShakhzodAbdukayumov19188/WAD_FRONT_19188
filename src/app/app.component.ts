import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Contact Manager</h1>
        <div class="space-x-4">
          <a routerLink="/contacts" 
             routerLinkActive="text-blue-400"
             class="hover:text-blue-300">Contacts</a>
          <a routerLink="/groups" 
             routerLinkActive="text-blue-400"
             class="hover:text-blue-300">Groups</a>
        </div>
      </div>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Contact Manager';
}