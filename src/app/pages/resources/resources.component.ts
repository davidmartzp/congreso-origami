import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../components/site/menu/menu.component";
import { BannerComponent } from "../../components/site/banner/banner.component";
import { ItineraryComponent } from "../../components/site/itinerary/itinerary.component";
import { SponsorsComponent } from "../../components/site/sponsors/sponsors.component";
import { FooterComponent } from "../../components/site/footer/footer.component";
import { FaqComponent } from "../../components/site/faq/faq.component";
import {  ResourcesListComponent } from "../../components/site/resources-list/resources-list.component";
import { Banner3Component } from "../../components/site/banner3/banner3.component";
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-frequently-questions',
  imports: [MenuComponent, BannerComponent, ItineraryComponent, SponsorsComponent, FooterComponent, FaqComponent, ResourcesListComponent, Banner3Component],
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesPageComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage('recursos');
  }
}
