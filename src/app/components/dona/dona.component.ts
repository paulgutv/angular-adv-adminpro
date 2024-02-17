import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: ``
})
export class DonaComponent implements OnInit {

  @Input()
  public labelValues: string[] = [];

  @Input()
  public dataValues: number[] = [];

  @Input()
  public title: string = "Sin título";


  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059']
      },
    ],
  };

  ngOnInit(): void {
    this.doughnutChartData.labels = this.labelValues;
    this.doughnutChartData.datasets[0].data = this.dataValues;
  }
}
