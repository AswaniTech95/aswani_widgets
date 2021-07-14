import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators'
import { User } from '../user'
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { environment } from 'src/environments/environment';


const url = environment.apiURL
const memoUrl = environment.apiURL 



@Injectable({
  providedIn: 'root'
})
export class DataService {
  idleState = 'Not started.';
  timedOut = false;
  isLoggedSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public messageSource = new BehaviorSubject<string>('');
  isLoading = new BehaviorSubject<boolean>(false);
  public _refresh = new Subject<void>();
  users;
  constructor(private idle: Idle, private http: HttpClient) { }
  /*Loading*/
  show() {
    this.isLoading.next(true)
  }
  hide() {
    this.isLoading.next(false);
  }
  get refresh() {
    return this._refresh;
  }

  //  Login Data
  public login(user: User): Observable<any> {
    this.reset();
    const headers = { 'content-type': 'application/json' }
    const userdata = {
      'username': user.username,
      'password': btoa(user.password)
    }
    const body = JSON.stringify(userdata);
    return this.http.post(memoUrl + 'usrserv/auth_token' + '', body, { 'headers': headers })
  }
  // public login(user: User): Observable<any> {
  //   this.reset();
  //   const headers = { 'content-type': 'application/json' }
  //   const userdata={
  //     'username':"tester1",

  //     'password':"MTIzNA=="
  //   }
  //   const body = JSON.stringify(userdata);
  //   return this.http.post(memoUrl + 'usrserv/auth_token' + '', body, { 'headers': headers })
  // }

  public logout(): Observable<any> {
    this.reset();
    let token = '';
    // const getToken = localStorage.getItem("sessionData");
    const getToken = localStorage.getItem("sessionData");
    if (getToken) {
      let tokenValue = JSON.parse(getToken);
      token = tokenValue.token;
    }
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.post<any>(memoUrl + "usrserv/logout", {}, { 'headers': headers })
  }
 
  async  getempmobiedata(empid: any)  {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    // if (pan == null || pan == '') {
    //   pan = "''"
    // }
    const res:any= await this.http.get<any>(memoUrl + 'usrserv/employeemobileno/' + empid, { 'headers': headers }).toPromise();
    this.users= res
 
    return this.users  }

    async  Finduserlocation(ips,employee_id)  {
      const headers = { 'Authorization': 'Token ' + 'token' }
      const res:any= await this.http.get<any>(memoUrl + 'usrserv/loginstatus?ips='+ips+'&employee_id='+employee_id, { 'headers': headers }).toPromise();
      this.users= res
      return this.users  }

    async  gen_otp(mob,type,employee_id)  {
    const headers = { 'Authorization': 'Token ' + 'token' }
    const res:any= await this.http.get<any>(memoUrl + 'venserv/validate?type='+type+'&value='+ mob.mobile_number+'&otp='+mob.otp+'&employee_id='+employee_id, { 'headers': headers }).toPromise();
    this.users= res
    return this.users  }
    
      public login_status(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get('https://ifconfig.me/forwarded',{ headers, responseType: 'text'});
         
        
      }



  public mobiledatapost(mobiledata ): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    // console.log("branchacty", JSON.stringify(branchActivity))
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.post<any>(memoUrl + "usrserv/employeemobileno", mobiledata, { 'headers': headers })
  }


  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  public getMenuUrl(): Observable<any> {
    this.reset();
    let token = '';
    let userId = ''
    // const getToken = localStorage.getItem("sessionData");
    const getToken = localStorage.getItem("sessionData");
    if (getToken) {
      let tokenValue = JSON.parse(getToken);
      token = tokenValue.token
      userId = tokenValue.user_id;
    }
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(memoUrl + "usrserv/user_modules", { 'headers': headers })
  }

  public getSubModule(menuId: number): Observable<any> {
    this.reset();
    let token = '';
    const getToken = localStorage.getItem("sessionData");
    if (getToken) {
      let tokenValue = JSON.parse(getToken);
      token = tokenValue.token
    }
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(memoUrl + "usrserv/usermodule/" + menuId + "/submodule", { 'headers': headers })
  }
  public getRefresh(): Observable<any> {
    // this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let url = memoUrl + "usrserv/refreshtoken"
    let object = {}
    let json = Object.assign({}, object)
    return this.http.post<any>(url, json, { 'headers': headers })
  }
 

  // nogitd
 
}