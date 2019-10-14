import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Observable } from 'rxjs';

import { finalize } from 'rxjs/operators';
import { LoaderService } from '../shared/services/loader.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public loaderService: LoaderService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Interceptor: show loader');
        this.loaderService.show();
        return next.handle(req).pipe(
            finalize(() => {this.loaderService.hide(); console.log('Interceptor: hide loader'); })
        );
    }
}
