export interface WidgetState {
  editMode?: boolean;
  parameters: any;
  data?: any;
  // serviceName: string;
}

export interface Widget {
  display_name: string;
  name: string;
  params: { name: string; type: string }[];
  widgetState: WidgetState;
}

export interface Service {
  display_name: string;
  name: string;
  widgets: Widget[];
}
