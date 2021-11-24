export interface WidgetState {
  editMode?: boolean;
  parameters: any;
}

export interface Widget {
  name: string;
  componentName: string;
  widgetState: WidgetState;
}

export interface Service {
  name: string;
  widgets: Widget[];
}
