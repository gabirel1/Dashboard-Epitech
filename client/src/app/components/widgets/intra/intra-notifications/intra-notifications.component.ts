import { Component, Input, OnInit } from '@angular/core';
import { Widget } from 'src/app/pages/dashboard/interfaces/services';
import { ServicesService } from 'src/app/pages/dashboard/services/services.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-intra-notifications',
  templateUrl: './intra-notifications.component.html',
  styleUrls: ['./intra-notifications.component.scss']
})
export class IntraNotificationsComponent implements OnInit {
  @Input() widget!: Widget;
  constructor() {}

  ngOnInit() { }
  
  parseHTML(html: string): string {
    let newString: string = "";
    let inHTML = false;
    for (let i = 0; i < html.length; i++) {
      if (html[i] === "<") {
        inHTML = true;
      } else if (html[i] === ">") {
        inHTML = false;
        continue;
      }
      if (!inHTML) {
        newString += html[i];
      }
    }
    return newString;
  }
}

export async function intraNotificationsRefresh(
  dataService: DataService,
  servicesService: ServicesService,
  widget: Widget
): Promise<any> {
  const params = servicesService.prepareParamsForRequest(widget);
  dataService
    .sendPostRequest(`widgets/${widget.name}`, {
      ...params,
    })
    .subscribe({
      next: (data) => {
        widget.widgetState.data = data;
      },
    });
}
