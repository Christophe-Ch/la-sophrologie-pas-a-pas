import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MentionsLegalesPageComponent } from './mentions-legales-page/mentions-legales-page.component';
import { QuiSuisJePageComponent } from './qui-suis-je-page/qui-suis-je-page.component';
import { SeancesPageComponent } from './seances-page/seances-page.component';
import { SophrologiePageComponent } from './sophrologie-page/sophrologie-page.component';
import { TarifsPageComponent } from './tarifs-page/tarifs-page.component';
import { CookiesPageComponent } from './cookies-page/cookies-page.component';
import { ConfidentialitePageComponent } from './confidentialite-page/confidentialite-page.component';
import { SeniorsPageComponent } from './seniors-page/seniors-page.component';
import { EntreprisesPageComponent } from './entreprises-page/entreprises-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sophrologie', component: SophrologiePageComponent },
  { path: 'seances', component: SeancesPageComponent },
  { path: 'seances/:type', component: SeancesPageComponent },
  { path: 'qui-suis-je', component: QuiSuisJePageComponent },
  { path: 'tarifs', component: TarifsPageComponent },
  { path: 'tarifs/:modalOpen', component: TarifsPageComponent },
  { path: 'seniors', component: SeniorsPageComponent },
  { path: 'entreprises', component: EntreprisesPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'mentions-legales', component: MentionsLegalesPageComponent },
  { path: 'politique-de-cookies', component: CookiesPageComponent },
  {
    path: 'politique-de-confidentialite',
    component: ConfidentialitePageComponent,
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
