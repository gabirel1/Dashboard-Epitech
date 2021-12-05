import { Component, Input, OnInit } from '@angular/core';
import { Widget } from 'src/app/pages/dashboard/interfaces/services';
import { ServicesService } from 'src/app/pages/dashboard/services/services.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-office-calendar-events',
  templateUrl: './office-calendar-events.component.html',
  styleUrls: ['./office-calendar-events.component.scss']
})
export class OfficeCalendarEventsComponent implements OnInit {
  @Input() widget!: Widget;
  constructor() {}

  ngOnInit() {}
}

export async function officeCalendarEventsRefresh(
  dataService: DataService,
  servicesService: ServicesService,
  widget: Widget
): Promise<any> {
  const params = servicesService.prepareParamsForRequest(widget);
  dataService
    .sendPostRequest(`widgets/${widget.name}`, {
      office_token: servicesService.getServiceParameter(
        widget.serviceName,
        "office_token"
      ),
      ...params,
    })
    .subscribe({
      next: (data) => {
        widget.widgetState.data = data;
      },
    });
}