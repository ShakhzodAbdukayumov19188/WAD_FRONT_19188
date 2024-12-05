import { Routes } from '@angular/router';
import { GroupListComponent } from './components/group/group-list/group-list.component';
import { GroupFormComponent } from './components/group/group-form/group-form.component';
import { GroupDetailComponent } from './components/group/group-detail/group-detail.component';
import { ContactListComponent } from './components/contact/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { ContactDetailComponent } from './components/contact/contact-detail/contact-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactListComponent },
  { path: 'contacts/new', component: ContactFormComponent },
  { path: 'contacts/:id', component: ContactDetailComponent },
  { path: 'contacts/:id/edit', component: ContactFormComponent },
  { path: 'groups', component: GroupListComponent },
  { path: 'groups/new', component: GroupFormComponent },
  { path: 'groups/:id', component: GroupDetailComponent },
  { path: 'groups/:id/edit', component: GroupFormComponent }
];