import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ApiData } from './pages/api-data/api-data';
import { ContactForm } from './pages/contact-form/contact-form';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'api-data', component: ApiData, title: 'API Data' },
  { path: 'contact', component: ContactForm, title: 'Contact' },
  { path: '**', redirectTo: '' },
];
