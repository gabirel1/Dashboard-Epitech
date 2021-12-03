export interface WidgetState {
  editMode?: boolean;
  parameters: any;
  data?: any;
  toDelete?: boolean;
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
  api_url: string;
  widgets: Widget[];
  params: { name: string; type: string }[];
}
