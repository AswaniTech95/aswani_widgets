import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location} from '@angular/common';
import { environment } from 'src/environments/environment';
const url = environment.clienturlfor_cookie
@Component({
  selector: 'app-widgetscreens',
  templateUrl: './widgetscreens.component.html',
  styleUrls: ['./widgetscreens.component.scss']
})

export class WidgetscreensComponent implements OnInit {
  widgetarray:any;
  constructor( private router: Router, private location: Location,  private route:ActivatedRoute) {
   
   
  }
  cardList = [
    {'cardTitle': 'Vendor', 'cardSubTitle': 'CardSub', 'icon':'list','link':'vendor','cardContent': 'Content for card 1', 'footer': 'footer for card 1'},
    {'cardTitle': 'Memo', 'cardSubTitle': 'Card2 sub title', 'icon':'forum','link':'memosummary', 'cardContent': 'Card2 content ', 'footer': 'Card2 footer'},
    {'cardTitle': 'Rems', 'cardSubTitle': 'Card3 sub title', 'icon':'local_play','link':'rems','cardContent': 'Card3 content', 'footer': 'card3 footer'},
    {'cardTitle': 'PR', 'cardSubTitle': 'CardSub', 'cardContent': 'Content for card 1','icon':'margin','footer': 'footer for card 1'},
    {'cardTitle': 'PO', 'cardSubTitle': 'Card2 sub title', 'icon':'margin','link':'pr','cardContent': 'Card2 content ', 'footer': 'Card2 footer'},
    {'cardTitle': 'Card3 Title', 'cardSubTitle': 'Card3 sub title','icon':'list','link':'po', 'cardContent': 'Card3 content', 'footer': 'card3 footer'},
    {'cardTitle': 'Card1 Title', 'cardSubTitle': 'CardSub', 'icon':'list','link':'vendor','cardContent': 'Content for card 1', 'footer': 'footer for card 1'},
    {'cardTitle': 'Card2 Title', 'cardSubTitle': 'Card2 sub title', 'icon':'list','link':'vendor','cardContent': 'Card2 content ', 'footer': 'Card2 footer'},
    {'cardTitle': 'Card3 Title', 'cardSubTitle': 'Card3 sub title', 'icon':'list','link':'vendor','cardContent': 'Card3 content', 'footer': 'card3 footer'}

]
  testclick(link){
   window.open( url+
     "#/"+link, "_blank");
     
    
 
  }


  ngOnInit(): void {
  }

}
