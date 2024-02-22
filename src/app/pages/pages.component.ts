import { Component, OnInit, inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent implements OnInit {

  private settingsService = inject(SettingsService);

  ngOnInit(): void {
    customInitFunctions();
  }

}
