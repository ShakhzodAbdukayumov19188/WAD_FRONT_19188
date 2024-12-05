import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GroupService } from "../../../services/group.service";
import { ContactService } from "../../../services/contact.service";
import { Group } from "../../../models/group.model";
import { Contact } from "../../../models/contact.model";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-group-detail",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-lg shadow-md p-6 mb-4">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h2 class="text-2xl font-bold">{{ group?.name }}</h2>
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

        <div class="mt-6">
          <h3 class="text-xl font-semibold mb-4">{{ group?.description }}</h3>
        </div>

        <button
          (click)="onBack()"
          class="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back to Groups
        </button>
      </div>
    </div>
  `,
})
export class GroupDetailComponent implements OnInit {
  group?: Group;
  contacts: Contact[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    const groupId = Number(this.route.snapshot.paramMap.get("id"));

    // Fetch group details
    this.groupService.getGroup(groupId).subscribe({
      next: (group) => (this.group = group),
      error: (err) => console.error("Error fetching group:", err),
    });
  }

  onEdit(): void {
    if (this.group) {
      this.router.navigate(["/groups", this.group.id, "edit"]);
    }
  }

  onDelete(): void {
    if (this.group && confirm("Are you sure you want to delete this group?")) {
      this.groupService.deleteGroup(this.group.id!).subscribe({
        next: () => this.router.navigate(["/groups"]),
      });
    }
  }

  onBack(): void {
    this.router.navigate(["/groups"]);
  }
}
