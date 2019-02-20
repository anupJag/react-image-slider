import * as React from 'react';
import styles from './ImageSlider.module.scss';
import { IImageSliderConfiguration } from '../IImageSliderProps';

export interface IImageSliderProps {
    SliderData: IImageSliderConfiguration[];
}

const imageSlider = (props: IImageSliderProps) => {

    const { SliderData } = props;
    const count: number = SliderData.length;
    const containerWidthPercent = `${100 / count}%`;

    return (
        <div className={styles.UlHolder}>
            {
                SliderData.map((el: IImageSliderConfiguration, index: number) => {
                    const liImage: React.CSSProperties = {
                        background: `url('${el.imageURL}') center top / cover no-repeat`,
                        borderRight: (index === (count - 1)) ? "none" : "1px solid #000"
                    };

                    let styleToBeApplied: string;

                    switch (count) {
                        case 1:
                            styleToBeApplied = [styles.divContainer, styles.divContainerItemCount1].join(' ');
                            break;
                        case 2:
                            styleToBeApplied = [styles.divContainer, styles.divContainerItemCount2].join(' ');
                            break;
                        case 3:
                            styleToBeApplied = [styles.divContainer, styles.divContainerItemCount3].join(' ');
                            break;
                        case 4:
                            styleToBeApplied = [styles.divContainer, styles.divContainerItemCount4].join(' ');
                            break;
                        case 5:
                            styleToBeApplied = [styles.divContainer, styles.divContainerItemCount5].join(' ');
                            break;
                    }

                    return (
                        <div style={liImage} className={styleToBeApplied}>
                            <div className={styles.Content}>
                                <h2>{el.imageTitle}</h2>
                                <p>
                                    {el.imageDesc}
                                </p>
                            </div>
                        </div>
                    );

                })
            }
        </div>
    );
};

export default imageSlider;