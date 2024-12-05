import { Component, OnInit, inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { GroupService } from "../../../services/group.service";
import { Group } from "../../../models/group.model";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";

@Component({
  selector: "app-group-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">
        {{ isEditing ? "Edit" : "Create" }} Group
      </h2>

      <form [formGroup]="groupForm" (ngSubmit)="onSubmit()" class="max-w-lg">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            formControlName="name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            [class.border-red-500]="
              groupForm.get('name')?.invalid && groupForm.get('name')?.touched
            "
          />
          <p
            *ngIf="
              groupForm.get('name')?.invalid && groupForm.get('name')?.touched
            "
            class="text-red-500 text-xs italic"
          >
            Name is required
          </p>
        </div>

        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="description"
          >
            Description
          </label>
          <textarea
            id="description"
            formControlName="description"
            rows="3"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <div class="flex gap-2">
          <button
            type="submit"
            [disabled]="groupForm.invalid"
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
export class GroupFormComponent implements OnInit {
  groupForm: FormGroup;
  isEditing = false;
  groupId?: number;

  router = inject(Router);
  route = inject(ActivatedRoute);
  groupService = inject(GroupService);

  constructor(private fb: FormBuilder) {
    // Initializing the form group
    this.groupForm = this.fb.group({
      name: ["", Validators.required],
      description: [""],
    });
  }

  ngOnInit(): void {
    this.groupId = Number(this.route.snapshot.paramMap.get("id"));
    if (this.groupId) {
      this.isEditing = true;
      const group = this.groupService.getGroup(this.groupId);
      if (group) {
        this.groupForm.patchValue(group);
      }
    }
  }

  onSubmit(): void {
    if (this.groupForm.valid) {
      const groupData: Group = this.groupForm.value;

      if (this.isEditing && this.groupId) {
        this.groupService
          .updateGroup(this.groupId, { ...groupData, id: this.groupId })
          .subscribe({
            next: () => {
              this.router.navigate(["/groups"]);
            },
          });
      } else {
        this.groupService.createGroup(groupData).subscribe({
          next: () => {
            this.router.navigate(["/groups"]);
          },
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(["/groups"]);
  }
}
