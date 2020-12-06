import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cascading-circular-tabs';

  data1 = [
    {
      name: 'IMM',
      image: 'assets/svg/imm.svg',
      link: '/immunology',
      description:
        'Immunology is a complex area of research encompassing diverse patient populations and products that target various aspects of the immune response.',
      devName: 'immunology', //keep this name same as intabList key & also keep the word same in URL
      displayName: 'Immunology',
      isSelected : false,
      id: 1
    },
    {
      name: 'IDV',
      image: 'assets/svg/ivd.svg',
      link: '#',
      description: 'yellow',
      devName: 'infectiousDisease',
      displayName: 'Infectious Disease',
      isSelected : false,
      id: 2
    },
    {
      name: 'CNS',
      image: 'assets/svg/cns.svg',
      link: '#',
      description: 'blue',
      devName: 'cnsd',
      displayName: 'Central Nervous System Disease',
      isSelected : false,
      id: 3
    },
    {
      name: 'ONC',
      image: 'assets/svg/onc.svg',
      link: '/oncology',
      description: 'orange',
      devName: 'oncology',
      displayName: 'Oncology',
      isSelected : false,
      id: 4
    },
    {
      name: 'CVD',
      image: 'assets/svg/cvd.svg',
      link: '/cvd',
      description: 'megenta',
      devName: 'cvd',
      displayName: 'Cardiovascular Disease',
      isSelected : false,
      id: 5
    },
    {
      name: 'PAH',
      image: 'assets/svg/pah.svg',
      link: '#',
      description: 'amber',
      devName: 'pah',
      displayName: 'Pulmonary Artery Hypertension',
      isSelected : false,
      id: 6
    },
  ];

  data2 = [];

  optionSelected(obj) {
    let flag = obj.data.some((ele) => ele.isSelected);

    if (flag)
      this.data2 = [
        {
          isSelected: false,
          name: 'string 1',
          id: 1,
        },
        {
          isSelected: false,
          name: 'string 2',
          id: 2,
        }, {
          isSelected: false,
          name: 'string 3',
          id: 3,
        },
      ];
    else
      this.data2 = [];
  }
}
