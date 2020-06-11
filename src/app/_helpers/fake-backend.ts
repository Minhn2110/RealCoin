import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../_models/user';


// const users: User[] = [{ id: 1, username: 'minh', password: 'minh', firstName: 'Test', lastName: 'User' }];

@Injectable() 
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            // .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        // function handleRoute() {
        //     switch (true) {
        //         case url.endsWith('/users/authenticate') && method === 'POST':
        //             return authenticate();
        //         case url.endsWith('/users') && method === 'GET':
        //             return getUsers();
        //         default:
        //             // pass through any requests not handled above
        //             return next.handle(request);
        //     }    
        // }

        // route functions

        // function authenticate() {
        //     const { username, password } = body;
        //     const user = users.find(x => x.username === username && x.password === password);
        //     if (!user) return error('Username or password is incorrect');
        //     return ok({
        //         id: user.id,
        //         username: user.username,
        //         firstName: user.firstName,
        //         lastName: user.lastName,
        //         token: 'yCFHgGiBjX5HG4w4lhAIPtK3PJVo-EBbZn67o8aEa_AyRcA3F5M92oAH2aKWqJrgTVN2nhzESwSxPa750w1LA0NszgrUhprpRWeSf7BlvN2HZ-zJwmOGFJlFLjt-6hXrF76CLQfQ4HOZqySTFf7pSCtagazdowF_hV-iHxEHc2BYRLfpy40z04gTU89D6kXLu23X2Dn_nCfhlYXUIM8YToRZHQp3KUoKHhe83MkxSUJhq3JPp_1VCBgAPaHqqY62ILtO5RwQ1K56s-jVqW4sOZrOVJG4isLnIW2mczXUFGT5J8-QYB6IBrfZ7XSGVNiPqENN-spKAK_D7al5o-uq4E6ysr4zaElPsL0cBuRw-SxU9bFWL2aRLxTDjzh9VKhD76fUzPh3-niWHkyeKFmY79SiTEy725MMFesMr1DM15XbyPljf6fW-8bLnAnAtVtQcOohujWkuwLqVMQofinp6iWGPoi9pwPgRlorxgCMdxnNWlr-gVdNOhRpMme4ENKA',
        //     })
        // }

        // function getUsers() {
        //     if (!isLoggedIn()) return unauthorized();
        //     return ok(users);
        // }

        // helper functions

        // function ok(body?) {
        //     return of(new HttpResponse({ status: 200, body }))
        // }

        // function error(message) {
        //     return throwError({ error: { message } });
        // }

        // function unauthorized() {
        //     return throwError({ status: 401, error: { message: 'Unauthorised' } });
        // }

        // function isLoggedIn() {
        //     return headers.get('Authorization') === 'Bearer fake-jwt-token';
        // }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};