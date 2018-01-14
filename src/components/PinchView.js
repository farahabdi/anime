/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from 'react-prefixr';
import PinchZoomPan from './PinchZoomPan';

class PinchView extends Component {
  getContainerStyle() {
    const { backgroundColor } = this.props;
    return {
      paddingTop: '100vh',
      overflow: 'hidden',
      position: 'relative',
      background: backgroundColor,
    };
  }

  getInnerStyle() {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  }

  getHolderStyle() {
    return {
      position: 'relative',
    };
  }

  getContentStyle(obj) {
    return {
      width: '100%',
      height: '100%',
      align: 'center',
      display: 'flex',
      alignItems: 'center',
      transform: `scale(${obj.scale}) translateY(${obj.y}px)translateX(${obj.x}px)`,
      transition: '.3s ease-out'
    }
  }

  renderDebug(obj) {
    return (
      <div style={{
        position: 'absolute', bottom: 0, left: 0, background: '#555', color: '#fff', padding: '3px 6px',
    }}>
        Scale: {obj.scale}, X: {obj.x}, Y: {obj.y}
      </div>
    );
  }

  render() {
    const {
      debug, initialScale, maxScale, holderClassName, containerClassName,
      children, onPinchStart, onPinchStop, scale,
    } = this.props;
    return (
      <PinchZoomPan
        scale={scale}
        initialScale={initialScale}
        maxScale={maxScale}
        // eslint-disable-next-line
        render={(obj) => {
        return (
          <div style={this.getHolderStyle()} className={holderClassName}>
            <div style={this.getContainerStyle()} className={containerClassName}>
              <div style={this.getInnerStyle()}>
                <div style={s(this.getContentStyle(obj))}>
                  {children}
                </div>
              </div>
            </div>
            {debug && this.renderDebug(obj)}
          </div>
        );
      }}
        onPinchStart={onPinchStart}
        onPinchStop={onPinchStop}
      />
    );
  }
}

PinchView.defaultProps = {
  initialScale: 1,
  maxScale: 2,
  backgroundColor: '#f2f2f2',
  debug: false,
  scale: 2.5,
};

PinchView.propTypes = {
  initialScale: PropTypes.number,
  maxScale: PropTypes.number,
  children: PropTypes.element.isRequired,
  containerClassName: PropTypes.string.isRequired,
  holderClassName: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  debug: PropTypes.bool,
  onPinchStart: PropTypes.func.isRequired,
  onPinchStop: PropTypes.func.isRequired,
  scale: PropTypes.number,
};

export default PinchView;
