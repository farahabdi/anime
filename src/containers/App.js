/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuth } from '../reducers/selectors';
import AuthenticatedPage from './AuthenticatedPage';
import PublicPage from './PublicPage';

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
        scale: 2.5,
    }
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleZoomIn(value) {
    this.setState({
      scale: this.state.scale+.25
    })
  }

  handleZoomOut(value) {
    this.setState({
      scale: this.state.scale-.25
    })
  }

  handleReset(value) {
    this.setState({
      scale: 1
    })
  }

  componentWillMount() { }
  render() {
    const { authenticated } = this.props;
    const { scale } = this.state
  
    return (
      <div>
        <div  className="panel">
          <input placeholder="Enter code here" type="text" />
          <button onClick={this.handleZoomIn}>Zoom In</button>
          <button onClick={this.handleZoomOut}>Zoom Out</button>
          <button disabled onClick={this.handleReset}>Reset</button>
        </div>
      { authenticated ? <AuthenticatedPage scale={scale} /> : <PublicPage /> }
      </div>
    );
  }
}
App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = getAuth;

export default connect(mapStateToProps, null)(App);
