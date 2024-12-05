import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { ContactService } from "../../../services/contact.service";
import { GroupService } from "../../../services/group.service";
import { Contact } from "../../../models/contact.model";
import { Group } from "../../../models/group.model";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-contact-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">
        {{ isEditing ? "Edit" : "Create" }} Contact
      </h2>

      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="max-w-lg">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            id="name"
            formControlName="name"
            class="shadow
          appearance-none border rounded w-full py-2 px-3 text-gray-700
          leading-tight focus:outline-none focus:shadow-outline"
            [class.border-red-500]="
              contactForm.get('firstName')?.invalid &&
              contactForm.get('firstName')?.touched
            "
          />
          <p
            *ngIf="
              contactForm.get('name')?.invalid &&
              contactForm.get('name')?.touched
            "
            class="text-red-500 text-xs italic"
          >
            Name is required
          </p>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            formControlName="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            [class.border-red-500]="
              contactForm.get('email')?.invalid &&
              contactForm.get('email')?.touched
            "
          />
          <p
            *ngIf="
              contactForm.get('email')?.invalid &&
              contactForm.get('email')?.touched
            "
            class="text-red-500 text-xs italic"
          >
            Valid email is required
          </p>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            formControlName="phone"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            [class.border-red-500]="
              contactForm.get('phone')?.invalid &&
              contactForm.get('phone')?.touched
            "
          />
          <p
            *ngIf="
              contactForm.get('phone')?.invalid &&
              contactForm.get('phone')?.touched
            "
            class="text-red-500 text-xs italic"
          >
            Phone is required
          </p>
        </div>

        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="groupId"
          >
            Group
          </label>
          <select
            id="groupId"
            formControlName="groupId"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a group</option>
            <option *ngFor="let group of groups" [value]="group.id">
              {{ group.name }}
            </option>
          </select>
          <p
            *ngIf="
              contactForm.get('groupId')?.invalid &&
              contactForm.get('groupId')?.touched
            "
            class="text-red-500 text-xs italic"
          >
            Group is required
          </p>
        </div>

        <div class="flex gap-2">
          <button
            type="submit"
            [disabled]="contactForm.invalid"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {{ isEditing ? "Update" : "Create" }}
          </button>
          <button
            type="button"
            (click)="onCancel()"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  `,
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isEditing = false;
  contactId?: number;
  groups: Group[] = [];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      groupId: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.groupService.getGroups().subscribe((groups) => {
      this.groups = groups;
    });

    this.contactId = Number(this.route.snapshot.paramMap.get("id"));
    if (this.contactId) {
      this.isEditing = true;
      const contact = this.contactService.getContact(this.contactId);
      if (contact) {
        this.contactForm.patchValue(contact);
      }
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contactData: Contact = {
        ...this.contactForm.value,
        groupId: Number(this.contactForm.value.groupId),
      };

      if (this.isEditing && this.contactId) {
        this.contactService
          .updateContact(this.contactId, { ...contactData, id: this.contactId })
          .subscribe({
            next: () => {
              this.router.navigate(["/contacts"]);
            },
          });
      } else {
        this.contactService.createContact(contactData).subscribe({
          next: () => {
            this.router.navigate(["/contacts"]);
          },
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(["/contacts"]);
  }
}
