import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {DataService} from '../service/data.service'
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service'
import { SharedService } from '../service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner'
import { NotificationService } from '../service/notification.service'
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { environment } from 'src/environments/environment';
const isSkipLocationChange = environment.isSkipLocationChange
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errormsg:any;
  returnUrl: string;
  mail_flag:any;
  otp_flag=false;
  mobile_flag=false;
count=100;
timeout:any;
  mobile_form: FormGroup;
  ips: any;
  otp2: boolean;
  session_data: any;
  mobile_num: any;

  constructor(private dataService: DataService, private router: Router,public cookieService:CookieService, private SpinnerService: NgxSpinnerService,private notification: NotificationService,
    private sharedService:SharedService,
    private formBuilder: FormBuilder,private route: ActivatedRoute) { }

  ngOnInit() {
   
    // this.getloginstatus();
    console.log(this.mobile_flag)
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
 
    this.mobile_form=this.formBuilder.group({
      mobile_number: [''],
      otp: [''],
      mobile_num:['']
   
      
    })
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/kvb';
    const item = localStorage.getItem("sessionData");
    this.route.queryParams
    .subscribe(params => {
      // console.log(params); 

      this.mail_flag=params.from;
  
    }
  );
    if (item !== null){
      let itemValue = JSON.parse(item);
      this.sharedService.Loginname=itemValue.name;
      this.sharedService.isLoggedin=true;
      this.sharedService.loginUserId=itemValue.user_id;
      this.sharedService.loginEmpId = itemValue.employee_id;
      if( this.mail_flag=='email'){
        //  this.getMenuUrl();
        this.sharedService.titleUrl = '';
        }else{
        //  this.getMenuUrl();
        }
    }
  }//endof oninit

  private getMenuUrl() {
    this.dataService.getMenuUrl()
      .subscribe((results: any[]) => {
        let data = results['data'];
      
        
          this.sharedService.titleUrl = data[0].url;
        
       
        this.sharedService.menuUrlData = data;
        this.router.navigateByUrl(this.sharedService.titleUrl,{ skipLocationChange: true });
      })
  }
 
  login() {
    localStorage.removeItem("memosearch_data")
    localStorage.removeItem("ls_approvaltypeiom");
    localStorage.removeItem("ls_approvaltype");
    this.dataService.login(this.loginForm.value)
      .subscribe(datas => {
        this.session_data=datas;
        this.dataService.Finduserlocation(this.ips,datas.employee_id)

        .then(data => {
          
        
  
          if(data.status==false){
            this.mobile_flag=true;
            

            
            this.mobile_form.get('mobile_number').setValue(data.mobile_number);
            this.mobile_num=data.mobile_number.slice(data.mobile_number.length - 3)
            this.mobile_num='XXXXXX'+this.mobile_num.toString()
            this.mobile_form.get('mobile_num').setValue(this.mobile_num);

            console.log(data.mobile_number.slice(data.mobile_number.length - 1))
            this.gen_otp()

           
            localStorage.setItem("location",JSON.stringify(this.mobile_flag))
      
            
           
            this.sharedService.loginEmpId = datas.employee_id;

       

        return true;
          }
          else if (data.status==true){
            this.mobile_flag=false;

        localStorage.setItem("sessionData",JSON.stringify(datas))
        localStorage.setItem("location",JSON.stringify(this.mobile_flag))
        
        this.cookieService.set("my-key",JSON.stringify(datas))
        const item = localStorage.getItem("sessionData");
        this.sharedService.Loginname=datas.name;
        this.sharedService.isLoggedin=true;
        this.sharedService.loginUserId=datas.user_id;
        this.sharedService.loginEmpId = datas.employee_id;
        
        this.sharedService.get_userlocation.next(this.mobile_flag)
      

         
          this.router.navigate(['/widget'], { skipLocationChange: isSkipLocationChange })
        return true;
          }
          // this.SpinnerService.hide();
  
        })
  
      }
      )
  }


  gen_otp(){
    this.count=100;

    let mob=this.mobile_form.value.mobile_number
    this.timeout = setInterval(() => {
      if (this.count > 0) {
        this.count -= 1;
      } else {
        clearInterval(this.timeout);
      }
    }, 500);
    if(mob.toString().length==10)
   {
    this.otp_flag=true;
    
     this.dataService.gen_otp(this.mobile_form.value,'gen_OTP',this.session_data.employee_id)
   
      .then(data => {
        console.log(data)
        if(data['validation_status'].Status=='Success'){
          
          // this.otp2=true;
          
          
        }else{
          if(data['validation_status'].Description){
            this.notification.showWarning(data['validation_status'].Description)}
            else{
          this.notification.showWarning(data['validation_status'].ErrorMessage)}
          // this.otp_flag=false;
          localStorage.removeItem("sessionData");
          this.sharedService.isLoggedin=false;
        
          // this.otp2=false;
          
        

        }
      }).finally(function() {
      });}
      else{

        this.mobile_flag=false;
        // this.otp2=false;
        this.notification.showWarning("You are trying to login from outside KVB environment.Kindly access the App via KVB environment and update your mobile number in the xxxxxxxxxx for getting the OTP")
        
      }
      // this.SpinnerService.hide(); 
  
  }
  // getloginstatus(){
  //   // this.SpinnerService.show();
  //   this.dataService.login_status()
  //     .subscribe(data => {
  //       console.log(data)
  //       this.ips=data;
  //       this.SpinnerService.hide();

  //     })
  // }
  mobilelogin()
{
  // this.SpinnerService.show();
  this.dataService.gen_otp(this.mobile_form.value,'validate_OTP',this.session_data.employee_id)
  .then(data => {
    console.log(data)
    if(data['validation_status'].Status=='Success'){
      localStorage.setItem("sessionData",JSON.stringify(this.session_data))
      localStorage.setItem("location",JSON.stringify(this.mobile_flag))
      this.cookieService.set("my-key",JSON.stringify(this.session_data))
      const item = localStorage.getItem("sessionData");
      this.sharedService.Loginname=this.session_data.name;
      this.sharedService.isLoggedin=true;
      this.sharedService.loginUserId=this.session_data.user_id;
      this.sharedService.loginEmpId = this.session_data.employee_id;
        this.sharedService.get_userlocation.next(this.mobile_flag)
        // this.getMenuUrl();
        // this.router.navigateByUrl(this.returnUrl,{ skipLocationChange: true });
        this.router.navigateByUrl('/widget');
        return true;
      }
        else{
          this.notification.showWarning(data['validation_status'].Description)
          localStorage.removeItem("sessionData");
          this.sharedService.isLoggedin=false;
        }
        
  })}

}