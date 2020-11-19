import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cascading-tabs',
  templateUrl: './cascading-tabs.component.html',
  styleUrls: ['./cascading-tabs.component.css'],
})
export class CascadingTabsComponent implements OnInit {
  constructor() {}
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

  ngOnInit(): void {
    console.log(this.svgEle);
    this.level1 = data1;
  }

  ngAfterViewInit() {
    console.log(data1);
    this.drawCircle(this.svgCircleRadius1, this.backgroundColors[1],0);

    this.drawCircle(this.svgCircleRadius2, this.backgroundColors[0],1);

    this.getPointsOnCircle(this.svgCircleRadius2, this.level1, 1);

    // this.getPointsOnCircle(this.svgCircleRadius3, this.level1);

    // this.svgEle.nativeElement.insertAdjacentHTML(
    //   'afterbegin',
    //   `<circle r=${this.svgCircleRadius3} cx=${
    //     this.svgWidth / 2
    //   } cy="0" fill="grey" />`
    // );

    console.log(this.svgEle);
  }

  onClickOption(event) {
    console.log(event);
    this.drawCircle(this.svgCircleRadius3, this.backgroundColors[2],2);
    this.getPointsOnCircle(this.svgCircleRadius3, this.level1, 2);
  }

  drawCircle(r, color,group) {
    this.svgEle.nativeElement.insertAdjacentHTML(
      'afterbegin',
      `<circle r=${r} cx=${this.svgWidth / 2} cy="0" fill=${color} id=${"circle_"+group} />`
    );
  }

  getPointsOnCircle(r, data, group) {
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

    let circleGroup = document.createElementNS(this.svgns, 'g');
    circleGroup.setAttribute('id', "gcircle_"+group);

    //append the small circle to the outer border circle
    data.forEach((ele) => {
      let circleEle = document.createElementNS(this.svgns, 'circle');
      circleEle.addEventListener('click', this.onClickOption.bind(this, ele));
      circleEle.setAttribute('r', '25');
      circleEle.setAttribute('cx', ele.x);
      circleEle.setAttribute('cy', ele.y);
      circleEle.setAttribute('fill', `url(#image${ele.id})`);
      circleEle.setAttribute('stroke-width', '2');
      circleEle.setAttribute('stroke', 'black');
      circleEle.setAttribute('id', 'circle_' + ele.id);
      // console.log(circleEle);

      circleGroup.appendChild(circleEle);
      //  .insertAdjacentElement("beforeend",circleEle)
      // this.svgEle.nativeElement.insertAdjacentHTML(
      //   'beforeend',
      //   `<circle r="25" cx=${ele.x} cy=${ele.y} stroke-width="2" stroke="black" fill="url(#image${ele.id})" (click)="onClickOption(ele)" id=${'circle'+ele.id} />
      //   <text x=${ele.textX} y=${ele.y} text-anchor="middle" fill="white" font-size="12px" font-family="Arial" dy=".3em">${ele.name}</text>`
      // );

      // this.svgEle.nativeElement.querySelector(`#circle${ele.id}`).addEventListener("click",this.onClickOption.bind(this,ele))
    });

    this.svgEle.nativeElement.insertAdjacentElement('beforeend', circleGroup);

    console.log(data);
    console.log(this.level1);
  }
}

const data1 = [
  {
    name: 'Jack FFF',
    icon: '/assets/report.png',
    id: 1,
  },
  {
    name: 'Jack VVs',
    icon: '/assets/vaccine.png',
    id: 2,
  },
  {
    name: 'Jack Jakki',
    icon: '/assets/report.png',
    id: 3,
  },
  {
    name: 'Jack n',
    icon: '/assets/vaccine.png',
    id: 4,
  },
  {
    name: 'Jack Hui hai',
    icon: '/assets/report.png',
    id: 5,
  },
  {
    name: 'Jack',
    icon: '/assets/vaccine.png',
    id: 6,
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
      },
      {
        name: 'child2',
        icon: '/assets/vaccine.png',
        id: 8,
      },
      {
        name: 'child3',
        icon: '/assets/vaccine.png',
        id: 9,
      },
    ],
  },
  {
    parentId: 2,
    data: [
      {
        name: 'child1',
        icon: '/assets/vaccine.png',
        id: 10,
      },
      {
        name: 'child2',
        icon: '/assets/vaccine.png',
        id: 12,
      },
      {
        name: 'child3',
        icon: '/assets/vaccine.png',
        id: 12,
      },
    ],
  },
];
