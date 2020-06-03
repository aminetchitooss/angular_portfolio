import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ToastaConfig, ToastaService, ToastOptions } from 'ngx-toasta';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CurrentUser } from '../models/models';

declare var CryptoJS: any;
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public USER_KEY = environment.userKey;
  public MASTER_KEY = environment.masterKey;
  public IMAGE_PLACE_HOLDER = "assets/images/newsBlank.png";
  history = []

  constructor(public toastaService: ToastaService, public toastaConfig: ToastaConfig,
    public translate: TranslateService, public router: Router) { }

  initApp() {
    this.toastaConfig.theme = 'material';
    this.toastaConfig.position = 'top-right';
    this.translate.addLangs(["fr", "en"]);
    // translate.setDefaultLang('fr');
    let browserLang: string = this.translate.getBrowserLang();
    this.translate.use('fr');
    this.loadRouting()
  }

  loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
      });
  }

  isNull(param) {
    return !this.isNotNull(param);
  }

  isNotNull(param) {
    return param !== undefined && param !== null && param !== "";
  }

  isNotEmpty(obj) {
    return !this.isEmpty(obj);
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  getCurrentUser(): CurrentUser {
    return this.isNotNull(JSON.parse(localStorage.getItem(this.USER_KEY))) ?
      JSON.parse(localStorage.getItem(this.USER_KEY)) : {};
  }

  setCurrentUser(pCurentUser: CurrentUser) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(pCurentUser));
  }

  encrypt(param) {
    let vParam = this.isNotNull(param) ? param.toString() : ""
    return CryptoJS.AES.encrypt(vParam, this.MASTER_KEY).toString();
  }

  decrypt(param) {
    let vParam = this.isNotNull(param) ? param.toString() : ""
    return CryptoJS.AES.decrypt(vParam, this.MASTER_KEY).toString(CryptoJS.enc.Utf8)
  }

  vibrate() {
    if (this.isNotNull(window.navigator.vibrate) && window.navigator.vibrate(100)) {
      setTimeout(() => {
        window.navigator.vibrate([200, 30, 100, 30]);
      }, 10);
    }
  }

  showError(message?: string, ptitle?: string) {
    this.vibrate()
    let toastOptions: ToastOptions = {
      title: this.isNotNull(ptitle) ? ptitle : "Error",
      msg: message,
      showClose: true,
      timeout: 3500,
    };
    this.toastaService.error(toastOptions);
  }

  showSuccess(message: string, ptitle?: string) {
    let toastOptions: ToastOptions = {
      title: this.isNotNull(ptitle) ? ptitle : "Success",
      msg: message,
      showClose: true,
      timeout: 2500,
    };
    this.toastaService.success(toastOptions);
  }

  showWarning(message: string, ptitle?: string) {
    let toastOptions: ToastOptions = {
      title: this.isNotNull(ptitle) ? ptitle : "Warning",
      msg: message,
      showClose: true,
      timeout: 4500,
    };
    this.toastaService.warning(toastOptions);
  }


  translateMessage(value: string): string {
    let trad;
    this.translate.get(value).subscribe((res: string) => { trad = res; });
    return trad;
  }

  formatTime(pDate) {
    const date = pDate.split('T')[0]
    const time = pDate.split('T')[1]
    return this.translateMessage('COMMON.pub') + date.split('-').reverse().join('/')
      + this.translateMessage('COMMON.at') + [time.split(':')[0], time.split(':')[1]].join(':')
  }

  truncContent(pDes, isTitle?) {
    const vLength = isTitle ? 70 : 120
    if (pDes) {
      if (pDes.length < vLength) {
        return pDes
      } else {
        let vParag = pDes.toString().substring(0, vLength).split(' ')
        vParag.pop()
        return vParag.join(' ') + " ..."
      }
    }
  }
}

