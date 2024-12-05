import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Group } from "../models/group.model";
import { API_CONFIG } from "./api.config";

@Injectable({
  providedIn: "root",
})
export class GroupService {
  private apiUrl = `${API_CONFIG.baseUrl}/Groups`;

  constructor(private http: HttpClient) {}

  // Get all groups
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }

  // Get a specific group by its ID
  getGroup(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/${id}`);
  }

  // Delete a group by its ID
  deleteGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Create a new group
  createGroup(group: Group): Observable<Group> {
    const data = this.http.post<Group>(this.apiUrl, group);
    console.log(group);

    return data;
  }

  // Update an existing group
  updateGroup(id: number, group: Group): Observable<Group> {
    return this.http.put<Group>(`${this.apiUrl}/${id}`, group);
  }
}
