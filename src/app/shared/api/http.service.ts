import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { LoaderService } from '../core/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient, public loader: LoaderService) { }

  getService(pUrl): Observable<any> {
    this.showLoader()
    return this.http.get(pUrl).pipe(map(this.formatResponse),
      tap(() => setTimeout(() => { this.hideLoader() }, 400)), catchError((err) => this.handleError(err)))
  }

  postService(pUrl, pBody): Observable<any> {
    this.showLoader()
    return this.http.post(pUrl, pBody).pipe(map(this.formatResponse),
      tap(() => setTimeout(() => { this.hideLoader() }, 400)), catchError((err) => this.handleError(err)))
  }

  formatResponse(pRes) {
    return pRes
  }

  handleError(error: any) {
    this.hideLoader()
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return of(errMsg);
  }

  showLoader() {
    this.loader.show()
  }

  hideLoader() {
    setTimeout(() => {
      this.loader.hide()
    }, 30);
  }


  getFakeService(): Observable<any> {
    this.showLoader()
    return this.http.get("./assets/mydata.json").pipe(map((res) => {
      this.hideLoader()
      return res
    }))
  }
}
