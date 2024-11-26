declare module 'react-slick' {
    import * as React from 'react';
  
    export interface Settings {
      dots?: boolean;
      infinite?: boolean;
      speed?: number;
      slidesToShow?: number;
      slidesToScroll?: number;
      arrows?: boolean;
      autoplay?: boolean;
      initialSlide?: number;
      responsive?: Array<{
        breakpoint: number;
        settings: Partial<Settings>;
      }>;
    }
  
    export class Slider extends React.Component<Settings> {}
    export default Slider;
  }
  