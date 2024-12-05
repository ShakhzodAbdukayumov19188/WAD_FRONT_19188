import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { ContactService } from "../../../services/contact.service";
import { GroupService } from "../../../services/group.service";
import { Contact } from "../../../models/contact.model";
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: "app-contact-detail",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-lg shadow-md p-6 mb-4">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h2 class="text-2xl font-bold">
              {{ contact?.name }}
            </h2>
            <p class="text-gray-600">{{ contact?.email }}</p>
            <p class="text-gray-600">{{ contact?.phone }}</p>
            <p class="text-gray-600">Group: {{ contact?.group?.name }}</p>
          </div>
          <div class="flex gap-2">
            <button
              (click)="onEdit()"
              class="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              (click)="onDelete()"
              class="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <button
        (click)="onBack()"
        class="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Back to Contacts
      </button>
    </div>
  `,
})
export class ContactDetailComponent implements OnInit {
  contact?: Contact;
  groupName: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    const contactId = Number(this.route.snapshot.paramMap.get("id"));
    this.contactService.getContact(contactId).subscribe({
      next: (contact) => {
        this.contact = contact;
      },
      error: (error) => {
        console.error("Error loading contacts:", error);
      },
    });
    if (this.contact) {
      this.groupService.getGroup(this.contact.groupId);
    }
  }

  onEdit(): void {
    this.router.navigate(["/contacts", this.contact?.id, "edit"]);
  }

  onDelete(): void {
    if (
      this.contact &&
      confirm("Are you sure you want to delete this contact?")
    ) {
      this.contactService.deleteContact(this.contact.id!).subscribe({
        next: () => {
          this.router.navigate(["/contacts"]);
        },
      });
    }
  }

  onBack(): void {
    this.router.navigate(["/contacts"]);
  }
}
