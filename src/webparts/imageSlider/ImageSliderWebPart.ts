import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneLabel,
  PropertyPaneHorizontalRule,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';
import * as isURL from 'is-url';
import * as strings from 'ImageSliderWebPartStrings';
import ImageSlider from './components/ImageSlider';
import { IImageSliderProps, IImageSliderConfiguration } from './components/IImageSliderProps';

export interface IImageSliderWebPartProps {
  imageSliderConfig: any[];
  numImages: number;
}

export default class ImageSliderWebPart extends BaseClientSideWebPart<IImageSliderWebPartProps> {


  protected getDefaultConfiguration = (): IImageSliderConfiguration => {
    let _defaultConfiguration: IImageSliderConfiguration = {
      imageDesc: "",
      imageTitle: "",
      imageURL: "",
    };

    return _defaultConfiguration;
  }

  private _onConfigure() {
    // Context of the web part
    this.context.propertyPane.open();
  }

  public render(): void {
    const element: React.ReactElement<IImageSliderProps> = React.createElement(
      ImageSlider,
      {
        imageSliderConfig: this.properties.imageSliderConfig,
        _onConfigure : this._onConfigure.bind(this)
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    debugger;
    let pPath = propertyPath;
    let pIndex = propertyPath[18];

    if (pPath == "numImages" && oldValue != newValue) {
      if (this.properties.imageSliderConfig.length < newValue) {
        while (this.properties.imageSliderConfig.length < newValue) {
          this.properties.imageSliderConfig.push(this.getDefaultConfiguration());
        }
      }
      else if (this.properties.imageSliderConfig.length > newValue) {
        while (newValue < this.properties.imageSliderConfig.length) {
          this.properties.imageSliderConfig.pop();
        }
      }
    }

    if (propertyPath.indexOf('[') != -1) {
      pPath = propertyPath.substring(22).replace('\"]', '');
    }

    if (pPath === "imageTitle" && (oldValue != newValue)) {
      this.properties.imageSliderConfig[pIndex]["imageTitle"] = newValue;
    }

    if (pPath === "imageDesc" && (oldValue != newValue)) {
      this.properties.imageSliderConfig[pIndex]["imageDesc"] = newValue;
    }

    if (pPath === "imageURL" && (oldValue != newValue)) {
      this.properties.imageSliderConfig[pIndex]["imageURL"] = newValue;
    }


    this.context.propertyPane.refresh();
    //this.render();
  }

  protected get disableReactivePropertyChanges() : boolean{
    return true;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected checkIfValidURL = (value: string): string => {
    let regexExp: RegExp = new RegExp(/(http(s):)([/|.|\w|\s|-])*\.(?:jpg|png)/);
    if (regexExp.test(value)) {
      return "";
    }
    return "Image URL should end with jpg or png";
  }

  protected checkforTitleLength = (value: string): string => {
    if(value.trim().toString().length > 15){
      return "Title cannot be more than 15 characters";
    }

    return "";
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let columnPropertyOptions: any[];

    columnPropertyOptions = [{
      groupName: "Image Silder Configuration",
      groupFields: [
        PropertyPaneSlider('numImages', {
          showValue: true,
          label: 'Max # of images',
          min: 1,
          max: 5,
        })
      ]
    }];

    for (let i = 0; i < this.properties.numImages; i++) {
      columnPropertyOptions.push(
        {
          groupName: `Image Silder ${i + 1} Configuration`,
          groupFields: [
            PropertyPaneTextField(`imageSliderConfig[${i}]["imageTitle"]`, {
              label: "Add a Title to your image",
              placeholder: "Title",
              onGetErrorMessage: this.checkforTitleLength.bind(this),
              maxLength: 16
            }),
            PropertyPaneTextField(`imageSliderConfig[${i}]["imageDesc"]`, {
              label: "Add a description to your image",
              multiline: true,
              placeholder: "Description",
              maxLength: 175
            }),
            PropertyPaneTextField(`imageSliderConfig[${i}]["imageURL"]`, {
              label: "Add the image URL",
              onGetErrorMessage: this.checkIfValidURL.bind(this),
              deferredValidationTime: 700
            })
          ],
        }
      );
    }


    return {
      pages: [
        {
          header: {
            description: "Add upto 5 images with a story behind each image"
          },
          groups: columnPropertyOptions
        }
      ]
    };
  }
}
