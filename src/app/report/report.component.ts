import { Component } from '@angular/core';

import { ChartComponent } from '../chart';
import { ChartConfig } from '../chart/chart.config';
import { ChartDataService } from '../shared/chart-data.service';

@Component({
  moduleId: module.id,
  selector: 'app-report',
  templateUrl: 'report.component.html',
  styleUrls: ['report.component.css'],
  providers: [ ChartDataService ],
  directives: [ ChartComponent ],
})
export class ReportComponent {

private areaChartConfig: Array<ChartConfig>;

  constructor(private chartDataService: ChartDataService) { 
    // this.getStats();
  }

  // getStats() {
  //   // For now we hardcode the customer Id until we build a user interface.
  //   this.chartDataService.byCustomer(1, 'monthly').subscribe(stats => {
  //     // Get JSON Object from Response
  //     stats = stats.json();
      
  //     // We create a new AreaChartConfig object to set income by customer config
  //     let customerIncomeArea = new ChartConfig();
  //     customerIncomeArea.settings = {
  //       fill: 'rgba(1, 67, 163, 1)',
  //       interpolation: 'monotone'
  //     };
  //     customerIncomeArea.dataset = stats.customerIncomeStats.map(data => {
  //       return { x: new Date(data.date), y: data.count };
  //     });
      
  //     // We create a new AreaChartConfig object to set orders by customer config
  //     let customerOrderArea = new ChartConfig();
  //     customerOrderArea.settings = {
  //       fill: 'rgba(195, 0, 47, 1)',
  //       interpolation: 'monotone'
  //     };
  //     customerOrderArea.dataset = stats.customerOrderStats.map(data => {
  //       return { x: new Date(data.date), y: data.count };
  //     });
      
  //     // to finish we append our AreaChartConfigs into an array of configs 
  //     this.areaChartConfig = new Array<ChartConfig>();
  //     this.areaChartConfig.push(customerIncomeArea);
  //     this.areaChartConfig.push(customerOrderArea);
  //   });
  // }

}
