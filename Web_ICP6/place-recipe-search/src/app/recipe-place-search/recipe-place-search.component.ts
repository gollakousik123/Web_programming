import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-recipe-place-search',
  templateUrl: './recipe-place-search.component.html',
  styleUrls: ['./recipe-place-search.component.css']
})
export class RecipePlaceSearchComponent implements OnInit {

  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];
  noRecords: boolean = false;
  currentLat: any;
  currentLong: any;
  geolocationPosition: any;
  venues: any;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {

    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      this._http.get('https://api.edamam.com/search?q=' + this.recipeValue +
        '&app_id=d84f33d5&app_key=8c4b54efa235416294859c125113e930&from=0&to=10&calories=591-722&health=alcohol-free').subscribe((recipes: any) => {
          this.noRecords = recipes.count == 0 ? true:false;
          console.log(this.noRecords)
          this.recipeList = Object.keys(recipes.hits).map((rec,index) =>  {
            const recipe = recipes.hits[index].recipe;
            return { name: recipe.label, content: recipe.digest[0].schemaOrgTag, icon: recipe.image, add: recipe.address, url: recipe.url }
          });
        },error => { 
          this.noRecords = true;
        }
        );

    }

    

    
       
let headers = new HttpHeaders().set("Authorization", "fsq3eGP39eYw6EAFnFjycsoaP9av5jjKndWuol32FbIAH3s=");

const httpOptions = {

  headers: headers

};



this._http.get<any>('https://api.foursquare.com/v3/places/search?client_id=5PZZRBX5NPCUW2QGB2RRKO50RLQQRFRTN1T2Y0LAPJL1XNLR' +

  '&client_secret=DWKDIOLABEUD25VCI4KZOL5AG4XPQIGD5TLVO0APJXNM5WFA&v=20220223&limit=10&near=' + this.placeValue + '&query=' + this.recipeValue, httpOptions)
  .subscribe((venues: any) => {
    this.venues = venues.results;
    console.log("data",this.venues);
  })   
}

  

}
