import React, { Component } from 'react';
import propsTypes from 'prop-types';
import Slider from 'react-slick';
import { IMAGE_URL } from '../../constants/Api';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class PhotoSlider extends Component {
  static props = {
    data: propsTypes.array.isRequired,
  }

  static defaultProps = {
    data: []
  }

  settings = {
    dots: false,
    slidesToShow: 2,
    centerMode: true,
    variableWidth: true,
    centerPadding: "30px"
  }

  render() {
    const { data } = this.props;

    if (!data.length) {
      return null;
    }

    return (
      <Slider className="slider-content" {...this.settings}>
        {
          data.map((photo, k) => {
            if (!photo.postMediaThum || !photo.postMediaThum[0]) {
              return null;
            }

            return (
              <div key={k}>
                <div className="item">
                  <div className="image" style={{backgroundImage: `url(${IMAGE_URL}/postPhoto/thumbnail/${photo.postMediaThum[0]})`}}>
                    <img src={`${IMAGE_URL}/postPhoto/thumbnail/${photo.postMediaThum[0]}`} alt="" />
                  </div>
                </div>
              </div>
            );
          })
        }
      </Slider>
    );
  }
}

export default PhotoSlider;

