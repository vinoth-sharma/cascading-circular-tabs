import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cascading-circular-tabs',
  templateUrl: './cascading-circular-tabs.component.html',
  styleUrls: ['./cascading-circular-tabs.component.css'],
})
export class CascadingCircularTabsComponent implements OnInit {
  @ViewChild('cascadingTabs', { static: true }) svgEle: ElementRef;

  svgWidth = 900;
  svgHeight = 700;
  svgCircleRadius1 = 150;
  svgCircleRadius2 = 300;
  svgCircleRadius3 = 450;
  svgns = 'http://www.w3.org/2000/svg';

  backgroundColors = ['red', 'yellow', 'grey'];

  ji = 'record.png';

  level1 = [];

  circularTabList = [];

  // ngOnInit(): void {
  //   console.log(this.svgEle);
  //   this.level1 = data1;
  // }

  ngOnInit() {
    console.log(data1);
    this.circularTabList.push(data1);
    this.drawCircle(this.svgCircleRadius1, this.backgroundColors[1], 0);
    this.drawCircle(this.svgCircleRadius2, this.backgroundColors[0], 1);

    this.generateAxisData(this.svgCircleRadius2, this.circularTabList[0], 1);
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
    console.log(id);
    
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
        point['textX'] = Math.round(temp_x) - 60; // padding left to the text
      } else {
        temp_x = this.svgWidth / 2 + -point.x;
        point['textX'] = Math.round(temp_x) + 60; //padding right to the text
      }
      point.x = Math.round(temp_x);
      point.y = Math.round(point.y);
    });

    console.log(this.circularTabList);
  }

  onClickOption(ele, type){

    if (type === 0) {
      let l_data = data2.find(dat2=>dat2.parentId === ele.id);

      if(!ele.isSelected && l_data){
        this.circularTabList[1] = l_data["data"];
        this.generateAxisData(
          this.svgCircleRadius3,
          this.circularTabList[1],
          2
        );
         this.drawCircle(this.svgCircleRadius3, this.backgroundColors[2], 2);
      }else{
        this.circularTabList.splice(1,1);
        this.removeCircle(2);
      }
    }

    this.circularTabList[type].forEach((element) => {
      if (element.id === ele.id) element.isSelected = !element.isSelected;
      else element.isSelected = false;
    });

    console.log(this.circularTabList);
  }
}

const data1 = [
  {
    name: 'Jack FFF',
    shortName: 'JFF',
    icon: '/assets/report.png',
    id: 1,
    isSelected: false,
  },
  {
    name: 'Jack VVs',
    shortName: 'JFF',
    icon: '/assets/vaccine.png',
    id: 2,
    isSelected: false,
  },
  {
    name: 'Jack Jakki',
    shortName: 'JFF',
    icon: '/assets/report.png',
    id: 3,
    isSelected: false,
  },
  {
    name: 'Jack n',
    shortName: 'JFF',
    icon: '/assets/vaccine.png',
    id: 4,
    isSelected: false,
  },
  {
    name: 'Jack Hui hai',
    shortName: 'JFF',
    icon: '/assets/report.png',
    id: 5,
    isSelected: false,
  },
  {
    name: 'Jack',
    shortName: 'JFF',
    icon: '/assets/vaccine.png',
    id: 6,
    isSelected: false,
  },
];

const data2 = [
  {
    parentId: 1,
    data: [
      {
        name: 'child1',
        icon: '/assets/vaccine.png',
        id: 7,
        isSelected: false,
      },
      {
        name: 'child2',
        icon: '/assets/vaccine.png',
        id: 8,
        isSelected: false,
      },
      {
        name: 'child3',
        icon: '/assets/vaccine.png',
        id: 9,
        isSelected: false,
      },
    ],
  },
  {
    parentId: 2,
    data: [
      {
        name: 'hlo',
        icon: '/assets/vaccine.png',
        id: 10,
        isSelected: false,
      },
      {
        name: 'child2',
        icon: '/assets/vaccine.png',
        id: 11,
        isSelected: false,
      },
      {
        name: 'child3',
        icon: '/assets/vaccine.png',
        id: 12,
        isSelected: false,
      },
    ],
  },
];
