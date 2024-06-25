import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { environment } from 'src/environment/environment';
  
  @Injectable()
  export class HttpBackendApiHeaderInterceptor implements HttpInterceptor {
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const isApiRequest = request.url.startsWith(environment.host.cm.url);
  
      if (isApiRequest) {
        request = request.clone({
          setHeaders: {
            'x-api-key': environment.host.cm.apiKey,
          },
        });
      }
  
      return next.handle(request);
    }
  }
  