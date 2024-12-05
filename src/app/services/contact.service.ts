import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contact } from "../models/contact.model";
import { API_CONFIG } from "./api.config";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  private apiUrl = `${API_CONFIG.baseUrl}/Contacts`;

  constructor(private http: HttpClient) {}

  // Get all contacts
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  // Get a contact by its ID
  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  // Create a new contact
  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  // Update an existing contact
  updateContact(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact);
  }

  // Delete a contact by its ID
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
