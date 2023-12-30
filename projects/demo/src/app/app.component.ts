import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { pageList } from './pages';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent{
  protected currentPage$ = inject(Router).events.pipe(filter(e => e instanceof NavigationEnd), map((e) =>  {
    const url = (e as NavigationEnd)?.url;
    return url?.length > 0 ? url.substring(1) : '';
  }));

  get pageList() {
    return pageList;
  }
}
