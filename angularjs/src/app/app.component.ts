import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { IBarData } from './interfaces/progress.bar';
import { Theme } from './components/progress/theme.enum';
import { DataService } from './services/data.service';
import { ProgressComponent } from './components/progress/progress.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  barData:IBarData;
  @ViewChildren(ProgressComponent) bars:QueryList<ProgressComponent>;
  isLoading:boolean = false;
  selectedProgressBar:any;
  selectedTheme:Theme = Theme.Blue;
  themeOpt = [
    {name:'Blue', value:Theme.Blue},
    {name:'Cyan', value:Theme.Cyan},
    {name:'Green', value:Theme.Green},
    {name:'Indigo', value:Theme.Indigo},
    {name:'Orange', value:Theme.Orange},
    {name:'Pink', value:Theme.Pink},
    {name:'Purple', value:Theme.Purple},
    {name:'Teal', value:Theme.Teal},
    {name:'Yellow', value:Theme.Yellow}
  ]
  constructor(private dataService:DataService){

  }
  ngOnInit(){
    this.loadBarData();
  }
  changeProgresValue(v:number){
    let progressBar = this.bars.toArray()[this.selectedProgressBar];
    progressBar.progress(v);
  }
  resetState(){
    this.selectedProgressBar = 0;
  }
  loadBarData(){
    this.isLoading = true;
    return this.dataService.loadData().subscribe((barData:IBarData)=>{
      this.resetState();
      this.barData = barData;
      this.isLoading = false;
    },(err)=>{
      this.isLoading = false;
      console.log(err);
    })
  }
}
