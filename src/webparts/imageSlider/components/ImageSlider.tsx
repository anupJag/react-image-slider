import * as React from 'react';
import styles from './ImageSlider.module.scss';
import { IImageSliderProps } from './IImageSliderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ImageSliderComp from './ImageSlider/ImageSlider';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export default class ImageSlider extends React.Component<IImageSliderProps, {}> {

  public render(): React.ReactElement<IImageSliderProps> {
    const renderControl: JSX.Element = this.props.imageSliderConfig && this.props.imageSliderConfig.length > 0 ?
      <ImageSliderComp
        SliderData={this.props.imageSliderConfig}
      />
      :
      <Placeholder
        iconName='Edit'
        iconText='Configure your web part'
        description='Please configure the web part.'
        buttonLabel='Configure'
        onConfigure={this.props._onConfigure} />;

    return (
      <div className={styles.imageSlider}>
        {renderControl}
      </div>
    );
  }
}
