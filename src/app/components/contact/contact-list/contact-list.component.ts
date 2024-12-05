import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../../services/contact.service';
import { GroupService } from '../../../services/group.service';
import { Contact } from '../../../models/contact.model';
import { Group } from '../../../models/group.model';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Contacts</h2>
        <button 
          class="bg-blue-500 text-white px-4 py-2 rounded"
          [routerLink]="['/contacts/new']">
          Add Contact
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div *ngFor="let contact of contacts" 
             class="border rounded p-4 shadow-sm">
          <h3 class="text-xl font-semibold">
            {{contact.name}}
          </h3>
          <p class="text-gray-600">{{contact.email}}</p>
          <p class="text-gray-600">{{contact.phone}}</p>
          <p class="text-gray-600">
            Group: {{getGroupName(contact.groupId)}}
          </p>
          <div class="mt-4 flex gap-2">
            <button 
              [routerLink]="['/contacts', contact.id]"
              class="bg-green-500 text-white px-3 py-1 rounded">
              View
            </button>
            <button 
              [routerLink]="['/contacts', contact.id, 'edit']"
              class="bg-yellow-500 text-white px-3 py-1 rounded">
              Edit
            </button>
            <button 
              (click)="deleteContact(contact.id!)"
              class="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  groups: Group[] = [];

  constructor(
    private contactService: ContactService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.loadContacts();
    this.loadGroups();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
      },
      error: (error) => {
        console.error('Error loading contacts:', error);
        // Handle error appropriately
      }
    });
  }

  loadGroups(): void {
    this.groupService.getGroups().subscribe({
      next: (groups) => {
        this.groups = groups;
      },
      error: (error) => {
        console.error('Error loading groups:', error);
        // Handle error appropriately
      }
    });
  }

  getGroupName(groupId: number): string {
    const group = this.groups.find(g => g.id === groupId);
    return group ? group.name : 'Unknown Group';
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id).subscribe({
        next: () => {
          this.loadContacts(); // Reload the contacts after deletion
        },
        error: (error) => {
          console.error('Error deleting contact:', error);
          // Handle error appropriately
        }
      });
    }
  }
}