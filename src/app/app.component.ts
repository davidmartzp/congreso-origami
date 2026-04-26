import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Origami Bogotá';

  private get gtagFn(): Function | null {
    const maybeGtag = (globalThis as { gtag?: unknown }).gtag;
    return typeof maybeGtag === 'function' ? maybeGtag : null;
  }

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // 👣 Seguimiento de navegación
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        const gtagFn = this.gtagFn;
        if (gtagFn) {
          gtagFn('config', 'G-YWKKW0SLJJ', {
            page_path: event.urlAfterRedirects,
          });
        }
      });

      // 🖱️ Seguimiento de clics
      document.addEventListener('click', this.trackClick);
    }
  }

  trackClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const gtagFn = this.gtagFn;
    if (!gtagFn) {
      return;
    }

    gtagFn('event', 'click', {
      event_category: 'interaction',
      event_label: `${target.tagName} - ${target?.innerText?.trim().substring(0, 30) || 'no-label'}`,
    });
  };
}
