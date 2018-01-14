/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { Observable } from 'rxjs';

class PinchZoomPan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: {
        scale: 2.5,
        x: -102,
        y: -136,
      },
      isPinching: false,
    };
    this.pinchTimeoutTimer = null;
  }

  componentDidMount() {
    this.handlePinch();
    this.resize();
    this.resizeThrottled = throttle(() => this.resize(), 500);
    global.addEventListener('resize', this.resizeThrottled);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.obj.scale !== nextProps.scale) {
      const obj = { ...this.state.obj, scale: nextProps.scale}
      this.setState({ obj });
    }
  }

  componentWillUnmount() {
    if (this.pinchSubscription) {
      this.pinchSubscription = null;
    }
    global.removeEventListener('resize', this.resizeThrottled);
  }

  resize() {
    if (this.root) {
      const domNode = this.root;
      this.setState({
        size: {
          width: domNode.offsetWidth,
          height: domNode.offsetHeight,
        },
      });
    }
  }

  handlePinch() {
    const domNode = this.root;
    const touchStart = Observable.fromEvent(domNode, (isTouch()) ? 'touchstart' : 'mousedown');
    const touchMove = Observable.fromEvent(window, (isTouch()) ? 'touchmove' : 'mousemove');
    const touchEnd = Observable.fromEvent(window, (isTouch()) ? 'touchend' : 'mouseup');

    function translatePos(point, size) {
      return {
        x: (point.x - (size.width / 2)),
        y: (point.y - (size.height / 2)),
      };
    }

    let startX = 0;
    let startY = 0;

    const pinch = touchStart
      .do((event) => {
        const { scale } = this.state.obj;
        // record x,y when touch starts
        startX = this.state.obj.x;
        startY = this.state.obj.y;

        // allow page scrolling -
        // ignore events unless they are beginning pinch or have previously pinch zoomed
        if (hasTwoTouchPoints(event) || isZoomed(scale)) {
          eventPreventDefault(event);
        }
      })
      .mergeMap((md) => {
        const startPoint = normalizeTouch(md);
        const { size } = this.state;

        return touchMove
          .map((mm) => {
            const { scale, x, y } = this.state.obj;
            const { maxScale } = this.props;
            const movePoint = normalizeTouch(mm);

            if (hasTwoTouchPoints(mm)) {
              // eslint-disable-next-line
              const scaleFactor = (isTouch() && mm.scale) ? mm.scale : (movePoint.x < (size.width / 2)) ? scale + ((translatePos(startPoint, size).x - translatePos(movePoint, size).x) / size.width) : scale + ((translatePos(movePoint, size).x - translatePos(startPoint, size).x) / size.width)
              const nextScale = between(1, maxScale, scaleFactor)
              return {
                scale: nextScale,
                x: (nextScale < 1.01) ? 0 : x,
                y: (nextScale < 1.01) ? 0 : y,
              };
            }
            const scaleFactorX = ((size.width * scale) - size.width) / (scale * 2);
            const scaleFactorY = ((size.height * scale) - size.height) / (scale * 2);
            return {
              x: between(inverse(scaleFactorX), scaleFactorX, movePoint.x - startPoint.x + startX),
              y: between(inverse(scaleFactorY), scaleFactorY, movePoint.y - startPoint.y + startY),
            };
          })
          .takeUntil(touchEnd);
      });

    this.pinchSubscription = pinch.subscribe((newObject) => {
      if (this.state.obj.scale !== newObject.scale) {
        this.refreshPinchTimeoutTimer();
      }
      global.requestAnimationFrame(() => {
        this.setState({
          obj: Object.assign({}, this.state.obj, newObject),
        });
      });
    });
  }

  refreshPinchTimeoutTimer() {
    if (this.pinchTimeoutTimer) {
      clearTimeout(this.pinchTimeoutTimer);
    }

    if (!this.state.isPinching) {
      this.pinchStarted()
    }

    this.pinchTimeoutTimer = setTimeout(() => this.pinchStopped(), 500);
  }

  pinchStopped() {
    this.setState({
      isPinching: false,
    }, () => {
      this.pinchTimeoutTimer = null;
      this.props.onPinchStop && this.props.onPinchStop()
    });
  }

  pinchStarted() {
    this.setState({
      isPinching: true,
    }, () => {
      this.props.onPinchStart && this.props.onPinchStart()
    });
  }

  render() {
    const { scale, x, y } = this.state.obj;
    return (
      <div ref={(root) => { this.root = root; }}>
        {this.props.render({
          x: x.toFixed(2),
          y: y.toFixed(2),
          scale: scale.toFixed(2),
        })}
      </div>
    );
  }
}

function eventPreventDefault(event) {
  event.preventDefault();
}

function isTouch() {
  return (('ontouchstart' in window) ||
      (navigator.MaxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0))
}

function hasTwoTouchPoints(event) {
  if (isTouch()) {
    return event.touches && event.touches.length === 2;
  }
  return event.altKey;
}

function isZoomed(scale) {
  return scale > 1;
}

function between(min, max, val) {
  return Math.min(max, Math.max(min, val))
}

function inverse(val) {
  return val * -1;
}

function normalizeTouch(e) {
  const p = isTouch() ? e.touches[0] : e;
  return {
    x: p.clientX,
    y: p.clientY,
  };
}

PinchZoomPan.defaultProps = {
  maxScale: 2,
};

PinchZoomPan.propTypes = {
  render: PropTypes.func.isRequired,
  onPinchStart: PropTypes.func.isRequired,
  onPinchStop: PropTypes.func.isRequired,
  maxScale: PropTypes.number,
};

export default PinchZoomPan;
