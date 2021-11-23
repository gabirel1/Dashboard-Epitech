export interface Widget {
  name: string;
  componentName: string;
}

export interface Service {
  name: string;
  widgets: Widget[];
}
