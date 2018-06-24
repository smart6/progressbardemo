import { Component, OnInit, Input } from '@angular/core';
import { Theme } from './theme.enum';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  @Input() maxVal:number=0;
  @Input() currentVal:number=0;
  @Input() theme:Theme = Theme.Blue;
  constructor() { }

  ngOnInit() {

  }
  computedTheme(){
    let p = this.percentage();
    return p > 100 ? Theme.Red:this.theme;
  }
  getDashArray(){
    let p = this.percentage();
    return [p, 100000]
  }
  percentage(){
    return Math.round(this.currentVal*100/this.maxVal);
  }
  progress(val:number){
    //tally the animation delay.
    ((cv,pv)=>{
      setTimeout(()=>{
        this.currentVal = Math.max(0,cv+pv);
      },200)
    })(this.currentVal,val)
  }
}
