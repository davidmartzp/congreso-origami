import { Component, OnInit } from '@angular/core';
import { BannerComponent } from "../../components/site/banner/banner.component";
import { FooterComponent } from "../../components/site/footer/footer.component";
import { ListWorkshopsComponent } from "../../components/site/workshops/list-workshops/list-workshops.component";
import { WorkshopsFormComponent } from "../../components/site/workshops/workshops-form/workshops-form.component";
import { MenuComponent } from "../../components/site/menu/menu.component";
import { SponsorsComponent } from "../../components/site/sponsors/sponsors.component";
import { VirtualWorkshopComponent } from "../../components/site/virtual-workshop/virtual-workshop.component";
import { WorkshopsOpenInscriptionsComponent } from "../../components/site/workshops-open-inscriptions/workshops-open-inscriptions.component";
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-workshops',
  imports: [BannerComponent, FooterComponent, ListWorkshopsComponent, WorkshopsFormComponent, MenuComponent, SponsorsComponent, VirtualWorkshopComponent, WorkshopsOpenInscriptionsComponent],
  templateUrl: './workshops.component.html',
  styleUrl: './workshops.component.css'
})
export class WorkshopsComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage('talleres');
  }
}
