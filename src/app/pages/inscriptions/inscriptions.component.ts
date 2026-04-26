import { Component, OnInit } from '@angular/core';
import { BannerComponent } from "../../components/site/banner/banner.component";
import { FooterComponent } from "../../components/site/footer/footer.component";
import { SponsorsComponent } from "../../components/site/sponsors/sponsors.component";
import { Banner2Component } from "../../components/site/banner2/banner2.component";
import { Banner3Component } from "../../components/site/banner3/banner3.component";
import { StepsComponent } from "../../components/site/inscriptions/steps/steps.component";
import { Step1Component } from "../../components/site/inscriptions/steps/step1/step1.component";
import { PayMethodsComponent } from "../../components/site/inscriptions/pay-methods/pay-methods.component";
import { Step2Component } from "../../components/site/inscriptions/steps/step2/step2.component";
import { MenuComponent } from "../../components/site/menu/menu.component";
import { FaqComponent } from "../../components/site/faq/faq.component";
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-inscriptions',
  imports: [BannerComponent, FooterComponent, SponsorsComponent, Banner3Component, StepsComponent, Step1Component, PayMethodsComponent, Step2Component, MenuComponent, FaqComponent],
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.css'
})
export class InscriptionsComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage('inscripciones');
  }
}
