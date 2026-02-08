import { Component, DestroyRef, inject, model, output, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SidebarMenuItems } from 'src/app/shared/components';
import { SidebarMenuItem } from 'src/app/shared/interfaces';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from 'src/app/core/services';
@Component({
  selector: 'app-side-bar',
  imports: [DrawerModule, ButtonModule, AvatarModule, SidebarMenuItems, RouterLink, TranslateModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBar {
  private readonly router = inject(Router);
  private translateService = inject(TranslationService);

  language = this.translateService.currentLang;
  visible = model(true);
  position = model<'left' | 'right'>('left');
  toggleSidebar = output<boolean>();
  dismissible = signal(false);
  sideMenuItems = signal<SidebarMenuItem[]>([]);

  private readonly MD_BREAKPOINT = 768;
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.updateSidebarState();
    this.listenForResizeEvents();
    this.intiateSideMenuItems();
  }

  /**
   * Listen for window resize events and update the sidebar state accordingly.
   */
  private listenForResizeEvents(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(10),
        takeUntilDestroyed(this.destroyRef), // Handles cleanup automatically
      )
      .subscribe(() => this.updateSidebarState());
  }

  /**
   * Update the state of the sidebar based on the screen size.
   * If the screen size is md or larger, the sidebar is visible and not dismissible.
   * If the screen size is smaller than md, the sidebar is hidden and dismissible.
   */
  private updateSidebarState(): void {
    const isMdOrLarger = window.innerWidth >= this.MD_BREAKPOINT;

    if (isMdOrLarger) {
      // md or larger: visible, not dismissible
      this.visible.set(true);
      this.dismissible.set(false);
      this.toggleSidebar.emit(true);
    } else {
      // smaller than md: hidden, dismissible
      this.visible.set(false);
      this.dismissible.set(true);
      this.toggleSidebar.emit(false);
    }
  }

  /**
   * Initialize the side menu items.
   */
  intiateSideMenuItems(): void {
    this.sideMenuItems.set([
      {
        label: 'menu.dashboard',
        icon: 'icon-guru',
        route: '/dashboard',
        visible: true,
      },
      {
        label: 'menu.systemConfigurations',
        icon: 'icon-config-1',
        visible: true,
        expanded: this.isExpanded('system-configurations'),
        items: [
          {
            label: 'menu.generalConfigurations',
            route: '/system-configurations/general-configurations',
            visible: true,
          },
          {
            label: 'menu.cities',
            route: '/system-configurations/cities',
            visible: true,
          },
          {
            label: 'menu.sports',
            route: '/system-configurations/sports',
            visible: true,
          },
        ],
      },
      {
        label: 'menu.administration',
        icon: 'icon-adminstration',
        visible: true,
        expanded: this.isExpanded('administration'),
        items: [
          {
            label: 'menu.users',
            route: '/administration/users',
            visible: true,
          },
          {
            label: 'menu.roles',
            route: '/administration/roles',
            visible: true,
          },
          {
            label: 'menu.audits',
            route: '/administration/audits',
            visible: true,
          },
        ],
      },
      {
        label: 'menu.clubManagement',
        icon: 'icon-club',
        visible: true,
        expanded: this.isExpanded('club-management'),
        items: [
          {
            label: 'menu.organizations',
            route: '/club-management/organizations',
            visible: true,
          },
          {
            label: 'menu.managers',
            route: '/club-management/managers',
            visible: true,
          },
          {
            label: 'menu.facilities',
            route: '/club-management/facilities',
            visible: true,
          },
        ],
      },
      {
        label: 'menu.booking',
        icon: 'icon-booking',
        route: '/booking',
        visible: true,
      },
      {
        label: 'menu.promoCodes',
        icon: 'icon-promo',
        route: '/promo-codes',
        visible: true,
      },
      {
        label: 'menu.customers',
        icon: 'icon-customers',
        route: '/customers',
        visible: true,
      },
      {
        label: 'menu.refunds',
        icon: 'icon-refund',
        route: '/refunds',
        visible: true,
      },
      {
        label: 'menu.reports',
        icon: 'icon-reports',
        visible: true,
        expanded: this.isExpanded('reports'),
        items: [
          {
            label: 'menu.subscriptionRevenue',
            route: '/reports/subscription-revenue',
            visible: true,
          },
          {
            label: 'menu.bookingRevenue',
            route: '/reports/booking-revenue',
            visible: true,
          },
          {
            label: 'menu.sportsRevenue',
            route: '/reports/sports-revenue',
            visible: true,
          },
          {
            label: 'menu.organizationRevenue',
            route: '/reports/organization-revenue',
            visible: true,
          },
        ],
      },
    ]);
  }

  /**
   * Check if the route is expanded.
   * @param route The route to check.
   * @returns True if the route is expanded, false otherwise.
   */
  isExpanded(route: string): boolean {
    return this.router.url.split('/')[1] === route;
  }

  logout() {
    this.router.navigate(['/auth/login']);
  }
}
