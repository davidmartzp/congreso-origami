import { Component } from '@angular/core';
import { BannerComponent } from "../../components/banner/banner.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SponsorsComponent } from "../../components/sponsors/sponsors.component";
import { Banner2Component } from "../../components/banner2/banner2.component";
import { Banner3Component } from "../../components/banner3/banner3.component";
import { StepsComponent } from "../../components/inscriptions/steps/steps.component";
import { Step1Component } from "../../components/inscriptions/steps/step1/step1.component";
import { PayMethodsComponent } from "../../components/inscriptions/pay-methods/pay-methods.component";
import { Step2Component } from "../../components/inscriptions/steps/step2/step2.component";
import { MenuComponent } from "../../components/menu/menu.component";
import { FaqComponent } from "../../components/faq/faq.component";

@Component({
  selector: 'app-inscriptions',
  imports: [BannerComponent, FooterComponent, SponsorsComponent, Banner3Component, StepsComponent, Step1Component, PayMethodsComponent, Step2Component, MenuComponent, FaqComponent],
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.css'
})
export class InscriptionsComponent {

}
