export interface WidgetState {
  editMode?: boolean;
  parameters: any;
  data?: any;
}

export interface Widget {
  display_name: string;
  name: string;
  params: { name: string; type: string }[];
  widgetState: WidgetState;
  serviceName: string;
}

export interface Service {
  display_name: string;
  name: string;
  widgets: Widget[];
}
