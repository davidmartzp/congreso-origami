import { Component } from '@angular/core';
import { BannerComponent } from "../../components/banner/banner.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ListWorkshopsComponent } from "../../components/workshops/list-workshops/list-workshops.component";
import { WorkshopsFormComponent } from "../../components/workshops/workshops-form/workshops-form.component";
import { MenuComponent } from "../../components/menu/menu.component";

@Component({
  selector: 'app-workshops',
  imports: [BannerComponent, FooterComponent, ListWorkshopsComponent, WorkshopsFormComponent, MenuComponent],
  templateUrl: './workshops.component.html',
  styleUrl: './workshops.component.css'
})
export class WorkshopsComponent {

}
