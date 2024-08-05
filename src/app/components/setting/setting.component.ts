import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  ngOnInit(): void {
    const openSettingsBtn = document.getElementById('open-settings-btn');
    const closeSettingsBtn = document.getElementById('close-settings-btn');
    const themeSettingsOffcanvas = document.getElementById('theme-settings-offcanvas');

    if (openSettingsBtn && themeSettingsOffcanvas) {
      openSettingsBtn.addEventListener('click', () => {
        themeSettingsOffcanvas.classList.toggle('hidden');
      });
    }

    if (closeSettingsBtn && themeSettingsOffcanvas) {
      closeSettingsBtn.addEventListener('click', () => {
        themeSettingsOffcanvas.classList.add('hidden');
      });
    }
  }
}