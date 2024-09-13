import { Injectable } from '@angular/core';
import Keycloak, { KeycloakInstance } from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class KeyClockService {
  private keycloakInstance: KeycloakInstance;

  constructor() {
    this.keycloakInstance = new Keycloak({
      url: 'http://localhost:8080/auth',
      realm: 'sample-KeyClock',
      clientId: 'angular-app',
    });
  }

  init(): Promise<void> {
    return this.keycloakInstance
      .init({
        onLoad: 'login-required', // Redirect to login if not authenticated
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        if (authenticated) {
          console.log('Authenticated');
        } else {
          console.log('Not authenticated');
        }
      })
      .catch((err) => {
        console.error('Keycloak initialization failed', err);
      });
  }

  // Call Keycloak's login method
  login(): void {
    this.keycloakInstance.login();
  }

  // Call Keycloak's logout method
  logout(): void {
    this.keycloakInstance.logout({
      redirectUri: window.location.origin,
    });
  }

  // Get Keycloak token to attach to API requests
  getToken(): string | undefined {
    return this.keycloakInstance.token;
  }

  // Get authenticated user details
  getUserProfile(): Promise<any> {
    return this.keycloakInstance.loadUserProfile();
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.keycloakInstance.authenticated;
  }

  // Update token when it is about to expire
  updateToken(minValidity: number = 5): Promise<boolean> {
    return this.keycloakInstance
      .updateToken(minValidity)
      .then((refreshed) => {
        if (refreshed) {
          console.log('Token refreshed');
        }
        return refreshed;
      })
      .catch(() => {
        console.log('Token refresh failed, logging out');
        this.logout();
        return false;
      });
  }
}
