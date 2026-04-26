import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../components/cms/sidebar/sidebar.component';
import { ScheduleManagerComponent } from '../../../components/cms/schedule-manager/schedule-manager.component';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, ScheduleManagerComponent],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  user = {
    name: 'Usuario Demo',
    role: 'Administrador',
    avatar: 'assets/images/avatar.png'
  };

  sidebarVisible = true;

  ngOnInit() {
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
