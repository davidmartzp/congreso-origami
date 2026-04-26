import { Component, OnInit } from '@angular/core';
import { BannerComponent } from "../../components/site/banner/banner.component";
import { AboutComponent } from "../../components/site/about/about.component";
import { GroupPhotoComponent } from "../../components/site/group-photo/group-photo.component";
import { GuestsComponent } from "../../components/site/guests/guests.component";
import { Banner2Component } from "../../components/site/banner2/banner2.component";
import { ActivitiesComponent } from "../../components/site/activities/activities.component";
import { Banner3Component } from "../../components/site/banner3/banner3.component";
import { SponsorsComponent } from "../../components/site/sponsors/sponsors.component";
import { SeparatorDownComponent } from "../../components/site/separator-down/separator-down.component";
import { FooterComponent } from "../../components/site/footer/footer.component";
import { MenuComponent } from "../../components/site/menu/menu.component";
import { ItineraryComponent } from "../../components/site/itinerary/itinerary.component";
import { AmigosPlegadoresComponent } from "../amigos-plegadores/amigos-plegadores.component";
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [BannerComponent, AboutComponent, GroupPhotoComponent, GuestsComponent, Banner2Component, ActivitiesComponent, Banner3Component, SponsorsComponent, FooterComponent, MenuComponent, ItineraryComponent, AmigosPlegadoresComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage('home');
  }
}
