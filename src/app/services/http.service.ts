import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
// import * as saveAs from 'file-saver';
import { Observable, Subject, takeUntil } from 'rxjs';
// import { HttpParamsUtil } from '../../utils/http.parms.utils';

@Injectable()
export abstract class HttpService implements OnDestroy {
  http: HttpClient;
//   httpParamUtil: HttpParamsUtil;

  private readonly unsubscribe$ = new Subject();

  constructor(client: HttpClient) {
    this.http = client;
    // this.httpParamUtil = new HttpParamsUtil();
  }

  get<T>(url: string, httpParams?: any): Observable<T> {
    return this.http.get<T>(url, { params: httpParams! });
  }

  post<T>(url: string, requestBody: any, headers?: any): Observable<T> {
    return this.http.post<T>(url, requestBody, { headers });
  }

  put<T>(url: string, id: number | string, requestBody: any): Observable<T> {
    return this.http.put<T>(`${url}/${id}`, requestBody);
  }

  patch<T>(url: string, id: number, requestBody: T): Observable<T> {
    return this.http.patch<T>(`${url}/${id}`, requestBody);
  }

  delete<T>(url: string, id: number | string, deleteLogin?:boolean): Observable<T> {
    if(deleteLogin){
      return this.http.delete<T>(`${url}/${id}/remove-login`)
    }else{
      return this.http.delete<T>(`${url}/${id}`);
    }
  }

  downloadFile<T>(url: string, fileName: string, httpParams?: any): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
    });
    this.http
      .get(url, {
        headers,
        params: httpParams,
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          console.log('resp==>',response)
        // this.saveFile(response.body, `${fileName}.${httpParams.export}`);
        }
      );
  }

//   private saveFile(data: Blob, fileName: string): void {
//     saveAs(data, fileName);
//   }

  private getFileNameFromResponse(response: any): string {
    const contentDispositionHeader = response.headers.get(
      'Content-Disposition'
    );
    const matches = contentDispositionHeader.match(
      /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    );

    console.log('matches => ', matches);
    const fileName = matches && matches.length > 1 ? matches[1] : 'unknown';
    return fileName;
  }

  encodeFormData(formData: any) {
    const urlSearchParams = new URLSearchParams();

    for (const key of Object.keys(formData)) {
      urlSearchParams.append(key, formData[key]);
    }

    return urlSearchParams.toString();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }
}
