import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { DashboardService } from '../_services/dashboard.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, 
        private dashboardService: DashboardService
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.access_token}`
                }
            });
        }

        return next.handle(request);
    }
}