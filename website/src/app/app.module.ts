import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SophrologiePageComponent } from './sophrologie-page/sophrologie-page.component';
import { SeancesPageComponent } from './seances-page/seances-page.component';
import { QuiSuisJePageComponent } from './qui-suis-je-page/qui-suis-je-page.component';
import { TarifsPageComponent } from './tarifs-page/tarifs-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { MentionsLegalesPageComponent } from './mentions-legales-page/mentions-legales-page.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './toast/toast.component';
import { CookiesPageComponent } from './cookies-page/cookies-page.component';
import { ConfidentialitePageComponent } from './confidentialite-page/confidentialite-page.component';
import { SeniorsPageComponent } from './seniors-page/seniors-page.component';
import { EntreprisesPageComponent } from './entreprises-page/entreprises-page.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomePageComponent,
    SophrologiePageComponent,
    SeancesPageComponent,
    QuiSuisJePageComponent,
    TarifsPageComponent,
    ContactPageComponent,
    MentionsLegalesPageComponent,
    ContentLayoutComponent,
    ToastComponent,
    CookiesPageComponent,
    ConfidentialitePageComponent,
    SeniorsPageComponent,
    EntreprisesPageComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true,
      })
    ),
  ],
})
export class AppModule {}
