import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');

  constructor() {
    const theme = localStorage.getItem('theme');
    this.linkTheme?.setAttribute('href', theme || './assets/css/colors/default.css');
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');
    if(links) {
      links.forEach(elem => {
        elem.classList.remove('working');
        const btnTheme = elem.getAttribute('data-theme');
        const btnThemUrl = `./assets/css/colors/${btnTheme}.css`;
        const currentTheme = this.linkTheme?.getAttribute('href');
        if(btnThemUrl === currentTheme) {
          elem.classList.add('working');
        }
      })
    }
  }
}
