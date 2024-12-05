import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { GroupService } from "../../../services/group.service";
import { Group } from "../../../models/group.model";

@Component({
  selector: "app-group-list",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Groups</h2>
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded"
          [routerLink]="['/groups/new']"
        >
          Add Group
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div *ngFor="let group of groups" class="border rounded p-4 shadow-sm">
          <h3 class="text-xl font-semibold">{{ group.name }}</h3>
          <p class="text-gray-600">{{ group.description }}</p>
          <div class="mt-4 flex gap-2">
            <button
              [routerLink]="['/groups', group.id]"
              class="bg-green-500 text-white px-3 py-1 rounded"
            >
              View
            </button>
            <button
              [routerLink]="['/groups', group.id, 'edit']"
              class="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupService.getGroups().subscribe((groups) => {
      this.groups = groups;
    });
  }
}
