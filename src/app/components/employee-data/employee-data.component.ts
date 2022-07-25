import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.scss']
})
export class EmployeeDataComponent implements OnInit {

  @Input() data: [];
  @Input() users: [];

  @ViewChild(DataBindingDirective, { static: false }) dataBinding: DataBindingDirective;

  constructor() { }

  // ngOnInit() {
  //   console.log(this.users)
  //   console.log(this.data)
  // }

  // public gridData: any[] = employees;
  // public gridData: [] = this.users;
  public gridData: any[] = this.data;
  // public gridData: any[];
  public gridView: any[];

  public mySelection: string[] = [];

  ngOnInit() {
    // this.gridData = this.data;
    this.gridView = this.gridData;
    // console.log(this.data)
    // console.log(this.gridData)
  }

  public onFilter(inputValue: string): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'EmployeeName',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;
    this.dataBinding.skip = 0;
  }


}
