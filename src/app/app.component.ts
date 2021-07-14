import { Component, OnInit,ViewChild} from '@angular/core';
import { DataService } from './service/data.service';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { SharedService } from './service/shared.service'
import { Idle } from '@ng-idle/core';
import {CookieService} from 'ngx-cookie-service'
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from './service/notification.service';
import { environment } from 'src/environments/environment';

const isSkipLocationChange = environment.isSkipLocationChange
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isPremise = false; showModal: boolean;
  timed: boolean = false;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  countdown: any;
  adcolor: any;

  // isLogged: boolean = true;
  isLoading: boolean = true;
  title = 'My First App';
  // Loginname = "";
  MODULES: any[];
  MODULES1: any[];
  TeamMembers = [];
  // MyModuleName = "";
  ionName: any;
  isIonName: boolean;
  // isSideNav: boolean;
  menurlList: Array<any>;
  menuId: number;
  subModuleList: any[];
  titleUrls: string;
  urlTitle: any;
  // transactionList = [];
  // masterList = [];
  isMasterList = false;
  isTransactionList = false;
  counter = 10;
  apiTimer: any
  masterUrl: any;
  transactionUrl: any;
  branchViewName: string;
  isbranchView: boolean;
  headerName = '';
  vendorCode: string;
  vendorName: string;
  vendorCode_Name: string;
  premiseCode_Name: string
  premiseCode: string;
  premiseName: string;
  agreementCode: string;
  landLordViewCode: string;
  occupancyViewCode: string;
  premiseDetailsName: string;
  premiseHeaderTitle: string;
  public currentlyClickedCardIndex: number = 0;
  premisesData: any;
  header_Name: string;
  mobileupdationform: any;
  login_id: any;
  editflag=false;
  // mobileupdation=false;
  @ViewChild('closebutton') closebutton;
  constructor(private idle: Idle, private dataService: DataService,private formBuilder: FormBuilder, private notification: NotificationService,
    public sharedService: SharedService,private SpinnerService: NgxSpinnerService,
    private router: Router, private location: Location, private route: ActivatedRoute,public cookieService:CookieService) {
      
      
    // this.isPremise=this.router.getCurrentNavigation().extras.state.isPremise;
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(1);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(900);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    //idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = '';
      this.timedOut = true;
      //let message="session expired"
      // alert(message)

      // localStorage.removeItem("isloggedin")
      // this.dataService.isLoggedSource.next(false);
      localStorage.removeItem("sessionData");
      // this.isLogged = false;
      // this.Loginname = undefined;
      this.sharedService.Loginname = undefined;
      this.sharedService.isLoggedin = false; this.showModal = false;
      this.router.navigateByUrl('/login');
    });

    // idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => {

      // this.idleState = 'session expired in ' + countdown + ' seconds!';
      this.idleState = '(' + countdown + ' s)';

      // // console.log(countdown)

      if (countdown == 1) {
        this.timed = true;
        // // console.log("I am happy");
      }

      if (countdown <= 300) {
        this.adcolor = 'red'
      }
      else {
        this.adcolor = 'grey'
      }
      if (countdown === 300) {
        this.dataService.getRefresh()
          .subscribe(result => {
            // console.log("refreshhhh",result)
          })
      }
     
      if (countdown === 30) {
        this.showModal = true;
      }

    });

    // this.reset();
  } //end of constructor

  ngOnInit() {

   
    this.mobileupdationform = this.formBuilder.group({
      code: [''],
      name: [''],
      mobile_number:['']  ,
      id:['']

      })

    
    const item = localStorage.getItem('sessionData');
    if (item !== null) {
      let itemValue = JSON.parse(item);
      this.sharedService.Loginname = itemValue.name;
      this.sharedService.isLoggedin = true;
      this.sharedService.loginUserId = itemValue.user_id;
      this.sharedService.loginEmpId = itemValue.employee_id;
      // this.getMenuUrl();
    }
    // this.getPremiseData();
    
  }

  mobile_popu(){
    // this.mobileupdation=true
    const sessionData = localStorage.getItem("sessionData")
    let logindata = JSON.parse(sessionData);
    this.login_id = logindata.employee_id;

    this.getmobilestatus()


  }
  getmobilestatus(){
    this.dataService.getempmobiedata(this.login_id)
      .then((results: any[]) => {
        console.log("city",results)
        let datas = results["data"];
      //   this.cityList = datas;
  
      if(datas!={}){
        this.mobileupdationform.get('mobile_number').setValue(datas.mobile_number);
        this.mobileupdationform.get('code').setValue(datas.code);
        this.mobileupdationform.get('name').setValue(datas.full_name);
        this.mobileupdationform.get('id').setValue(datas.id);
        this.editflag=true;
  
      }
       })
  
  }
    
    submitForm(){
     let data= localStorage.getItem("location")
     if (data=='true'){
      this.notification.showWarning("You are trying to login from outside KVB environment.Kindly access the App via KVB environment and update your mobile number in the xxxxxxxxxx for getting the OTP")
      return false
     }
      if(this.mobileupdationform.value.mobile_number.length==10){
      this.dataService.mobiledatapost(this.mobileupdationform.value)
      .subscribe((results: any[]) => {
        console.log("city",results)
        let datas = results["data"];
        if(datas.code!=''){
          this.notification.showSuccess("Success")

        this.mobileupdationform.reset()
        this.closebutton.nativeElement.click();
      
          
  
        }
        else{
          this.notification.showWarning("Failed")

        this.mobileupdationform.reset()
        this.closebutton.nativeElement.click();
        }
        // this.cityList = datas;
       })
  
    }}
    
  private getMenuUrl() {
    this.dataService.getMenuUrl()
      .subscribe((results: any[]) => {
        let data = results['data'];
        // console.log("this.sharedService.isSideNav",this.sharedService.isSideNav);
        this.sharedService.titleUrl = data[0].url;
        this.sharedService.menuUrlData = data;
        this.menurlList = this.sharedService.menuUrlData;
        this.titleUrls = this.sharedService.titleUrl;
        //this.router.navigateByUrl(this.titleUrls, { skipLocationChange: false });
        this.sharedService.transactionList= [];
        this.sharedService.masterList= [];
        this.menurlList.forEach(element => {
          if (element.type === "transaction") {
            this.sharedService.transactionList.push(element);
          } else if (element.type === "master") {
            this.sharedService.masterList.push(element);
          }
        })

      })
  }

  continue() {
    this.showModal = false;
    this.dataService.getRefresh()
      .subscribe(result => {
        this.reset();
      })
  }

  logout() {
    // localStorage.removeItem("isloggedin")
    // this.dataService.isLoggedSource.next(false);
    this.showModal = false;
    this.idleState = '';
    this.timedOut = true;
    this.logout1();
    this.idle.stop()
    this.cookieService.delete("my-key");
    localStorage.removeItem("sessionData");
    // this.isLogged = false;
    // this.Loginname = undefined;
    this.sharedService.Loginname = undefined;
    this.sharedService.isLoggedin = false;
    this.sharedService.MyModuleName = ""
    this.headerName = '';
    this.router.navigateByUrl('/login');


  }
  private logout1() {
    this.dataService.logout()
      .subscribe((results: any[]) => {
        let datas = results["data"];
      })
  }


  myModuleFunction(modrow, cardIndex) {
    this.isIonName = false;
    this.menuId = modrow.id;
    this.headerName = '';
    this.premiseHeaderTitle = ''
    this.sharedService.MyModuleName = modrow.name;
    this.currentlyClickedCardIndex = cardIndex;
    this.router.navigate([modrow.url], { skipLocationChange: isSkipLocationChange });//, 
  }

  public checkIfCardIsClicked(cardIndex: number): boolean {
    return cardIndex === this.currentlyClickedCardIndex;
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }


  // backNavigation() {
  //   this.isIonName = false;
  //   this.sharedService.ionName.next('')
  //   this.router.navigate(["/memosummary"], { skipLocationChange: isSkipLocationChange })
  // }


  openNav() {
    if (this.sharedService.isSideNav) {
      document.getElementById("mySidenav").style.width = "200px";
      document.getElementById("main").style.marginLeft = "12rem";
      this.sharedService.isSideNav = false;
    } else {
      document.getElementById("mySidenav").style.width = "50px";
      document.getElementById("main").style.marginLeft = "40px";
      this.sharedService.isSideNav = true;
    }
  }
  // masterData() {
  //   let data = this.sharedService.masterList;
  //   this.masterUrl = data[0].url
  //   this.sharedService.MyModuleName = data[0].name;
  //   this.router.navigateByUrl(this.masterUrl, { skipLocationChange: isSkipLocationChange });
  //   this.isMasterList = true;
  //   this.isTransactionList = false;
  //   this.headerName = '';

  // }
  // homes() {
  //   let data = this.sharedService.transactionList;
  //   this.transactionUrl = data[0].url
  //   this.sharedService.MyModuleName = data[0].name;
  //   this.router.navigateByUrl(this.transactionUrl, { skipLocationChange: isSkipLocationChange });
  //   this.isTransactionList = true;
  //   this.isMasterList = false;
  //   this.headerName = '';
  // }


  // backBranchView() {
  //   this.router.navigate(["/vendorView"], { skipLocationChange: isSkipLocationChange })
  // }

  // backVendor() {
  //   let vendorName = "Vendor";
  //   this.sharedService.MyModuleName = vendorName;
  //   this.headerName = "";
  //   this.router.navigate(["/vendor"], { skipLocationChange: isSkipLocationChange })
  // }

  // backpremise() {
  //   this.premisesData.forEach(element => {
  //     this.header_Name = element.headerName;
  //   });
  //   if (this.premisesData) {
  //     let index = this.premisesData.length - 1
  //     let data = this.premisesData[index]
  //     this.router.navigate([data.routerUrl], { skipLocationChange: isSkipLocationChange });
  //     this.sharedService.MyModuleName = this.header_Name;
  //     this.headerName = '';
  //   }
  // }
  
  // reports() {
  //   this.router.navigate(['/reports'], { skipLocationChange: isSkipLocationChange })

  // }
  // getPremiseData() {
  //   this.remsshareService.premiseBackNavigation.subscribe(result => {
  //     if (result != null) {
  //       this.premisesData = result.data
  //       let index = this.premisesData.length - 1
  //       let data = this.premisesData[index]
  //       this.headerName = 'REMS';
  //       this.premiseCode = data.code;
  //       this.premiseName = data.name;
  //       if (data.title == BackNavigationData.premiseView) {
  //         this.premiseCode_Name = this.premiseCode + " (" + this.premiseName + ")";
  //       } else if (data.title == BackNavigationData.agreementView) {
  //         this.premiseCode_Name = this.premiseCode;
  //       } else if (data.title == BackNavigationData.landLordView) {
  //         this.premiseCode_Name = this.premiseCode_Name + " / " + this.premiseName;
  //       } else if (data.title == BackNavigationData.occupancyView) {
  //         this.premiseCode_Name = this.premiseCode_Name + " / " + this.premiseCode;
  //       } else if (data.title == BackNavigationData.premiseDetailsView) {
  //         this.premiseCode_Name = this.premiseCode_Name + " / " + this.premiseName;
  //       } else if (data.title == BackNavigationData.premisesIdentificationView) {
  //         this.premiseCode_Name = this.premiseCode + "(" + this.premiseName + ")";
  //       } else if (data.title == BackNavigationData.premisesDocInfoView) {
  //         this.premiseCode_Name = this.premiseName;
  //       } else if (data.title == BackNavigationData.scheduleView) {
  //         this.premiseCode_Name = this.premiseCode;
  //       } else if (data == "") {
  //         this.sharedService.MyModuleName = "REMS"
  //       }
  //     }
  //   })
  // }
}

export enum BackNavigationData {
  agreementView = "AgreementView",
  premiseView = "PremiseView",
  landLordView = "LandLordView",
  occupancyView = "OccupancyView",
  premiseDetailsView = "PremiseDetailsView",
  premisesIdentificationView = "PremisesIdentificationView",
  premisesDocInfoView = "PremisesDocInfoView",
  scheduleView = "ScheduleView"
}