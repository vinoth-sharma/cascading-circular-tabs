import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cascading-tabs',
  templateUrl: './cascading-tabs.component.html',
  styleUrls: ['./cascading-tabs.component.css']
})
export class CascadingTabsComponent implements OnInit {

  @ViewChild('cascadingTabs', { static: true }) svgEle: ElementRef;
  @Input() data1:Array<any> = [];
  @Input() data2:Array<any> = [];
  @Output() optionSelected = new EventEmitter<any>();
  @Output() drugSelected = new EventEmitter<any>();
  
  svgWidth = 900;
  svgHeight = 700;
  svgCircleRadius1 = 200;
  svgCircleRadius2 = 325;
  svgCircleRadius3 = 450;
  backgroundColors = ['rgb(23,64,111)', '#67b7e6', '#bde0fe'];

  isLevel1Selected:boolean = false;
  circularTabList = [];
  therapeutic_data = [];
  drug_data = [];

  ngOnInit() {
    this.therapeutic_data = this.data1;    
    this.drawCircle(this.svgCircleRadius1, this.backgroundColors[0], 0);
    this.drawCircle(this.svgCircleRadius2, this.backgroundColors[1], 1);
    this.generateAxisData(this.svgCircleRadius2, this.therapeutic_data, 1);
  }

  ngOnChanges(simpleChanges: SimpleChanges){
    if(simpleChanges.data2.currentValue){
      this.drug_data = simpleChanges.data2.currentValue;
      this.updateDrugData();
    }
  }

  updateDrugData(){
    if(this.drug_data.length){
      this.generateAxisData(
        this.svgCircleRadius3,
        this.drug_data,
        2
      );
      this.drawCircle(this.svgCircleRadius3, this.backgroundColors[2], 2);  
    }
    else{
      this.removeCircle(2);
    }
  }

  drawCircle(r, color, group) {
    if(!this.svgEle.nativeElement.querySelector(`#ccircle_${group}`))
      this.svgEle.nativeElement.insertAdjacentHTML(
        'afterbegin',
        `<circle r=${r} cx=${this.svgWidth / 2} cy="0" fill=${color} id=${
          'ccircle_' + group
        } />`
      );
  }

  removeCircle(id) {
    if(this.svgEle.nativeElement.querySelector(`#ccircle_${id}`))
      this.svgEle.nativeElement.querySelector(`#ccircle_${id}`).remove();
  }

  generateAxisData(r, data, group) {
    let noOfDots = data.length;
    let initailDeg = 180 / (noOfDots + 1);

    // calculate the point on outer circle
    for (let index = 0; index < noOfDots; index++) {
      data[index]['x'] = r * Math.cos((initailDeg * Math.PI) / 180.0);
      data[index]['y'] = r * Math.sin((initailDeg * Math.PI) / 180.0);
      initailDeg += 180 / (noOfDots + 1);
    }

    //make the points proper align wrt svg container
    data.forEach((point) => {
      let temp_x = 0;
      if (Math.sign(point.x) === 1) {
        temp_x = this.svgWidth / 2 - point.x;
        point['textX'] = Math.round(temp_x) - 34; // padding left to the text
        point['textPosition'] = "end";
      } else {
        temp_x = this.svgWidth / 2 + -point.x;
        point['textX'] = Math.round(temp_x) + 34; //padding right to the text
        point['textPosition'] = "start";
      }
      point.x = Math.round(temp_x);
      point.y = Math.round(point.y);
    });

  }


  onClickOption(ele, type){
    if(type === 1){
      this.therapeutic_data.forEach((element) => {
        if (element.id === ele.id) element.isSelected = !element.isSelected;
        else element.isSelected = false;
      });
      this.optionSelected.emit({data: this.therapeutic_data,type: type});  
    }else{
      this.drug_data.forEach((element) => {
        if (element.id === ele.id) element.isSelected = !element.isSelected;
        else element.isSelected = false;
      });
      this.drugSelected.emit({ therapy : this.therapeutic_data , drug : this.drug_data })
    }
    this.validateSelection();
  }

  validateSelection(){
    this.isLevel1Selected = this.therapeutic_data.some(ele=>{
      return ele.isSelected
    })
  }
}

