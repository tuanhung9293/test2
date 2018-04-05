import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import propsTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { MasterLayout } from '../../components/layouts';
import { PremiumBar, DetailBanner } from '../../components/restaurants';
import * as Actions from '../../actions/';
import { IMAGE_URL } from '../../constants/Api';

import { MyReviews, MyFollowers } from '../../components/mypage';

class ListImage extends Component {
  state = {
    breadcrumb: []
  }

  componentDidMount = () => {
    let breadcrumb = [
      {
        name: 'HOME',
        link: '/',
      }
    ];
    
    this.setState({
      breadcrumb: breadcrumb.concat([
        {
          name: this.props.restaurant.mainArea
        },
        {
          name: this.props.restaurant.subArea
        },
        {
          name: this.props.restaurant.restaurantName
        }
      ])
    });
  }

  render() {
    const { restaurant } = this.props;

    return (
      <MasterLayout breadcrumb={this.state.breadcrumb}>
        {/* <div className="breadcrumb-container">
          <ul className="list">
            <li><a href="#">エリア名</a></li>
            <li>店舗名</li>
          </ul>
        </div> */}
        <section className="main-container list-image-container personal-container detail-container">
          {/* <div className="personal-banner-container">
            <div className="image" style={{backgroundImage: `url(images/image-user-banner.jpg)`}}>
              <img src="images/image-user-banner.jpg" alt="" />
            </div>
          </div>
          <div className="wrap-user-info">
            <div className="personal-avatar">
              <div className="image-avatar" style={{backgroundImage: `url(images/image-follower-1.jpg)`}}>
                <img src="images/image-follower-1.jpg" alt="" />
              </div>
            </div>
          </div> */}
          <div className="banner-container">
            <div className="banner-item">
            <DetailBanner data={restaurant} />
            </div>
          </div>
          <div className="category-container">
            <PremiumBar item={restaurant} />
            <div className="clearfix"></div>
          </div>
          {/* <div className="block-container tab-user">
            <ul className="list">
              <li className="item"><a href="#" className="no-bdr no-bdb no-bdl">レビュア</a></li>
              <li className="item"><a href="#" className="no-bdb">レビュー</a></li>
              <li className="item"><a href="#" className="no-bdr no-bdb no-bdl">お気に</a></li>
              <li className="item"><a href="#" className="no-bdr no-bdl">ブログ</a></li>
              <li className="item"><a href="#">入り</a></li>
              <li className="item"><a href="#" className="no-bdr no-bdl">ブログ</a></li>
            </ul>
            <div className="clearfix"></div>
          </div> */}
          <div className="block-container">
            <h2 className="main-title">写真</h2>
            <div className="list-girl-content">
              <ul className="list-girl-image">
                {
                  restaurant.restaurantPhotoThum.map((item, key) =>
                    <li className="item" key={key}>
                      <span className="image" style={{ backgroundImage: `url(${IMAGE_URL}/resPhoto/thumbnail/${item}`}}></span>
                    </li>
                  )
                }
              </ul>
              <div className="clearfix"></div>
              <div className="wrap-button">
                <a href="#" className="button-action">他のキャストを見る</a>
              </div>
            </div>
          </div>
          <div className="block-container link-container mt0 mb0">
            <a href="#" className="button button-top"><span className="ficon ficon-up"></span> 店舗トップへ</a>
            <a href="#" className="button button-link-store"><span className="ficon ficon-home"></span> サイトトップへ</a>
          </div>
          <div className="clearfix"></div>
        </section>
      </MasterLayout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  restaurant: state.entities.restaurants[state.restaurants.detail] || {},
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListImage);



  // static props = {
  //   myProfile: propsTypes.object,
  //   myReviews: propsTypes.object,
  //   myFollowers: propsTypes.object,
  // }

  // static defaultProps = {
  //   myProfile: {},
  //   myReviews: {},
  //   myFollowers: [],
  // }

  // state = {
  //   avatar: '',
  //   coverImg: ''
  // }
