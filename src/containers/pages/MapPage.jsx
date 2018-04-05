import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import propsTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { MasterLayout } from '../../components/layouts';
import * as Actions from '../../actions/';
import { IMAGE_URL } from '../../constants/Api';
import { Map } from '../../components/utils';

class MapPage extends Component {
  render() {
    const { restaurant } = this.props;
    return (
      <MasterLayout>
        <div className="breadcrumb-container">
          <ul className="list">
            <li><a href="#">メイン</a></li>
            <li>エリア検索</li>
          </ul>
        </div>
        <section className="main-container map-page-container search-container">
          <div className="block-container tab-user">
            <ul className="list">
              <li className="item"><a href="#" className="no-bdl no-bdr">レビュア</a></li>
              <li className="item"><a href="#" className="no-bdr">レビュー</a></li>
            </ul>
            <div className="clearfix"></div>
          </div>
          <div className="block-container mb0">
            <div className="map-content">
              <div className="map-image">
                  <Map
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQ_F0DpO7I7r5pN8xdyOxN58xKxiwzrKo&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `241px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    lat={localStorage.getItem("lat") || 35.6}
                    lng={localStorage.getItem("lng") || 139.6}
                  />
              </div>
            </div>
            <div className="group-button">
              <Link to={`/`} className="button-action"><span className="ficon-magnifying-glass"></span>通常検索</Link>
              <Link to={`/search`} className="button-action mr0">ランキング検索</Link>
            </div>
          </div>
          <div className="block-container link-container mt0 mb0 pt0">
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
)(MapPage);
