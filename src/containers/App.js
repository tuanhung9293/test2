import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RenderRoutes } from '../routes';
import * as Actions from '../actions/';
import '../assets/styles/main.css';

class App extends Component {

  componentWillMount = () => {
    this.getLocation();
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getPosition);
    } else {
      alert ("Geolocation is not supported by this browser.");
    }
  }
  
  getPosition = (position) =>  {
    localStorage.setItem("lat", position.coords.latitude);
    localStorage.setItem("lng", position.coords.longitude);
  }

  render() {
    return (
      <RenderRoutes routes={this.props.route.routes}/>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
