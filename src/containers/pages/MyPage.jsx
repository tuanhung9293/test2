import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import propsTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { MasterLayout } from '../../components/layouts';
import * as Actions from '../../actions/';
import { IMAGE_URL } from '../../constants/Api';

import { MyReviews, MyFollowers } from '../../components/mypage';

class MyPage extends Component {
  static props = {
    myProfile: propsTypes.object,
    myReviews: propsTypes.object,
    myFollowers: propsTypes.object,
  }

  static defaultProps = {
    myProfile: {},
    myReviews: {},
    myFollowers: [],
  }

  state = {
    avatar: '',
    coverImg: ''
  }

  componentDidMount = () => {
    this.props.actions.getMyProfile(this.props.auth.user);
    this.props.actions.getMyReviews(this.props.auth.user);
    this.props.actions.getMyFollowers(this.props.auth.user);
  }

  uploadAvatar = () => {
    let formData = new FormData();
    formData.append("profile_pic", this.state.avatar);
    this.props.actions.uploadAvatar(this.props.auth.user, formData)
      .then(() => {
        if (this.props.uploadAvatar) this.props.actions.getMyProfile(this.props.auth.user);
      })
  }

  handleChangeAvatar = (e) => {
    let selectorFiles = e.target.files;
    let reader = new FileReader();
    if (!selectorFiles) return;
    reader.readAsDataURL(selectorFiles[0]);
    reader.onload = () => {
      this.setState({ avatar: reader.result })
      this.uploadAvatar();
    }
  }

  uploadCoverImg = () => {
    let formData = new FormData();
    formData.append("coverimage", this.state.coverImg);
    this.props.actions.uploadCoverImg(this.props.auth.user, formData)
      .then(() => {
        if (this.props.uploadCoverImg) this.props.actions.getMyProfile(this.props.auth.user);
      })
  }

  handleChangeCover = (e) => {
    let selectorFiles = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(selectorFiles[0]);
    reader.onload = () => {
      this.setState({ coverImg: reader.result })
      this.uploadCoverImg();
    }
  }

  handleSeeMoreClick = (e) => {
    e.preventDefault();
    let limit = this.props.myReviews.limit + 5;
    this.props.actions.getMyReviews(this.props.auth.user, 0, limit);
  }

  render() {
    return (
      <MasterLayout>
        <section className="main-container personal-container">
          <div className="personal-banner-container">
            <div className="image"
              style={{
                backgroundImage: this.props.myProfile.coverimage ?
                  `url(${IMAGE_URL}/cover/${this.props.myProfile.coverimage})` : ''
              }}
            >
            </div>
            <div className="file-upload-form">
              <input type="file" className="input-file" onChange={ this.handleChangeCover } />
              <span className="ficon-photo-camera"></span> 編集
            </div>
          </div>
          <div className="wrap-user-info">
            <div className="personal-avatar">
              <div className="image-avatar"
                style={{
                  backgroundImage: this.props.myProfile.profile_pic ?
                    `url(${IMAGE_URL}/profile/${this.props.myProfile.profile_pic})` : ''
                }}
              >
              </div>
              <div className="upload-avatar">
                <div className="file-upload-form">
                  <input type="file" className="input-file" onChange={ this.handleChangeAvatar }/>
                  <span className="ficon-photo-camera"></span> 編集
                </div>
              </div>
            </div>
            <div className="username">
              <a href="#" className="button-edit">編集 <span className="ficon-next"></span></a>
              <p className="text">{this.props.myProfile.fullname}</p>
            </div>
          </div>
          <div className="block-container tab-user">
            <ul className="list">
              <li className="item active"><a href="#" className="no-bdr no-bdt no-bdl">レビュアートップ</a></li>
              <li className="item">
                <Link to="/restaurants">レビュー済 店舗</Link>
              </li>
              <li className="item">
                <Link to="/favorite">お気に入り</Link>
              </li>
              <li className={`item ${this.props.myProfile.cast ? '' : 'disabled'}`}>
                <Link to="/blog">ブログ</Link>
              </li>
            </ul>
            <div className="clearfix"></div>
          </div>
          <div className="block-container my-review-container">
            <h2 className="main-title text-center">マイレビュー</h2>
            <MyReviews myReviews={this.props.myReviews.items}/>
            <div className="footer-bar text-center">
              <a href="#" className="button-link" onClick={this.handleSeeMoreClick}>もっと見る（{this.props.myReviews.items.length}）<span className="ficon-next"></span></a>
              {/* <a href="#" className="button-link" onClick={this.handleSeeMoreClick}>口コミ一覧へ（{this.props.myReviews.items.length}）<span className="ficon-next"></span></a> */}
            </div>
          </div>
          <div className="block-container my-followers-container">
            <h2 className="main-title text-center">マイフォロワー</h2>
            <MyFollowers myFollowers={this.props.myFollowers} />
            <div className="footer-bar">
              <Link to="/followers" className="button-link">
              もっと見る（{this.props.myFollowers.length}) <span className="ficon-next"></span>
              </Link>
            </div>
          </div>
          <div className="block-container link-container">
            <a href="#" className="button button-link-store"><span className="ficon ficon-home"></span> レビュアートップ</a>
          </div>
          <div className="clearfix"></div>
        </section>
      </MasterLayout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  myProfile: state.users.myProfile,
  myReviews: state.users.myReviews,
  myFollowers: state.users.myFollowers,
  uploadAvatar: state.users.uploadAvatar,
  uploadCoverImg: state.users.uploadCoverImg,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPage);

