export interface IImageSliderProps {
  imageSliderConfig: any[];
  _onConfigure:() => void;
}

export interface IImageSliderConfiguration {
  imageTitle: string;
  imageDesc: string;
  imageURL: string;
}