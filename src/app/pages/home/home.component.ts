import { Component } from '@angular/core';
import { BannerComponent } from "../../components/banner/banner.component";
import { AboutComponent } from "../../components/about/about.component";
import { GroupPhotoComponent } from "../../components/group-photo/group-photo.component";
import { GuestsComponent } from "../../components/guests/guests.component";
import { Banner2Component } from "../../components/banner2/banner2.component";
import { ActivitiesComponent } from "../../components/activities/activities.component";
import { Banner3Component } from "../../components/banner3/banner3.component";
import { SponsorsComponent } from "../../components/sponsors/sponsors.component";
import { SeparatorDownComponent } from "../../components/separator-down/separator-down.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MenuComponent } from "../../components/menu/menu.component";
import { ItineraryComponent } from "../../components/itinerary/itinerary.component";

@Component({
  selector: 'app-home',
  imports: [BannerComponent, AboutComponent, GroupPhotoComponent, GuestsComponent, Banner2Component, ActivitiesComponent, Banner3Component, SponsorsComponent, FooterComponent, MenuComponent, ItineraryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
