import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MentionsLegalesPageComponent } from './mentions-legales-page/mentions-legales-page.component';
import { QuiSuisJePageComponent } from './qui-suis-je-page/qui-suis-je-page.component';
import { SeancesPageComponent } from './seances-page/seances-page.component';
import { SophrologiePageComponent } from './sophrologie-page/sophrologie-page.component';
import { TarifsPageComponent } from './tarifs-page/tarifs-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sophrologie', component: SophrologiePageComponent },
  { path: 'seances', component: SeancesPageComponent },
  { path: 'qui-suis-je', component: QuiSuisJePageComponent },
  { path: 'tarifs', component: TarifsPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'mentions-legales', component: MentionsLegalesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
