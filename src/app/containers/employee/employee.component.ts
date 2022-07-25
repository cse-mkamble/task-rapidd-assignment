import { Component, OnInit, ViewChild } from '@angular/core';

import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { LegendLabelsContentArgs } from '@progress/kendo-angular-charts';
import { IntlService } from '@progress/kendo-angular-intl';

import { User } from './../../models/user';
import { ApiService } from './../../services/api.service';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  public getData: any[];

  public users: User[] = [];
  public OldEmployeesData: any[];

  EmployeesData = [];
  PieData = [];

  @ViewChild(DataBindingDirective, { static: false }) dataBinding: DataBindingDirective;

  constructor(private apiService: ApiService, private intl: IntlService) {
    this.labelContent = this.labelContent.bind(this);
  }

  ngOnInit() {
    this.fetchData()
  }

  public gridData: any[];
  public gridView: any[];
  public pieView: any[];

  public mySelection: string[] = [];

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

  fetchData() {
    this.apiService.getAllUser().subscribe(data => {
      console.log(data)
      this.users = data;
      this.OldEmployeesData = data.map(function (data) {
        var startTime = moment(data.StarTimeUtc);
        var endTime = moment(data.EndTimeUtc);
        return {
          EmployeeName: data.EmployeeName,
          TimeDiff: moment(endTime.diff(startTime)).format("hh:mm:ss")
        }
      })
      var holder = {};
      this.OldEmployeesData.forEach(function (item) {
        if (holder.hasOwnProperty(item.EmployeeName)) {
          const allhours = [holder[item.EmployeeName], item.TimeDiff];
          const totalhours = allhours
            .slice(1)
            .reduce(
              (prev, cur) => moment.duration(cur).add(prev),
              moment.duration(allhours[0])
            );
          var ms = totalhours._milliseconds;
          var ticks = ms / 1000;
          var hh = Math.floor(ticks / 3600);
          var mm = Math.floor((ticks % 3600) / 60);
          var ss = ticks % 60;
          holder[item.EmployeeName] = hh + ':' + String(mm).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
        } else {
          holder[item.EmployeeName] = item.TimeDiff;
        }
      });

      for (var itemHolder in holder) {
        this.EmployeesData.push({ EmployeeName: itemHolder, TotalTime: holder[itemHolder] });
      }
  
      this.gridData = this.EmployeesData;
      this.gridView = this.EmployeesData;
    })
  }

  public labelContent(args: LegendLabelsContentArgs): string {
    var timeSplit = args.dataItem.TotalTime.split(":");
    var second = (+timeSplit[0]) * 60 * 60 + (+timeSplit[1]) * 60 + (+timeSplit[2]);
    var result = (second * 100) / 22252800;
    return `${args.dataItem.EmployeeName} ${result.toFixed(2)}% `;
  }

}
