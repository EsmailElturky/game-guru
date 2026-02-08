import { Component, computed, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { NavBar } from '../nav-bar/nav-bar';
import { SideBar } from '../side-bar/side-bar';
import Aura from '@primeuix/themes/aura';
import { TranslationService } from '../../services';
@Component({
  selector: 'app-layout',
  imports: [TranslateModule, ButtonModule, RouterModule, NavBar, SideBar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  // Injected Services
  private translationService = inject(TranslationService);

  // Properties
  isEnglish = computed(() => this.translationService.currentLang() == 'en');
  isSidebarVisible = signal(true);

  constructor() {
    console.log(Aura);
  }

  toggleSidebar() {
    this.isSidebarVisible.set(!this.isSidebarVisible());
  }
}
