/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authActions } from '../actions';
import PinchPanZoom from '../components/PinchZoomPan'
import s from 'react-prefixr'
import PinchView from '../components/PinchView'
import map from '../assets/map.jpg'

class AuthenticatedPage extends Component {

  componentWillMount() {
    authActions.initialiseApp();
  }

  render() {
    const {height,width,handleZoomChange} = this.props
    const ratio = (height / width) * 100
    const { signOut, scale } = this.props;
    return (
      <PinchView scale={scale} zoomChange={handleZoomChange} debug maxScale={4} containerRatio={((400 / 600) * 100)}>
        <img src={map} style={{width: '100%', height: '100vh'}} />
      </PinchView>
    );
  }
}

AuthenticatedPage.propTypes = {
  signOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  signOut: authActions.signOut,
};

export default connect(null, mapDispatchToProps)(AuthenticatedPage);
