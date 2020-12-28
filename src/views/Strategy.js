import React, { Component } from 'react'
import StratPage from './StratPage'
import { connect } from 'react-redux'

import {
    Redirect,
    Route
  } from "react-router-dom";
  
  export class Strategy extends Component {

      render() {
          return (
              <>
                <Route path="/strategy/1">
                    <StratPage auth={this.props.auth} stratId={1} />
                </Route>

                <Route path="/strategy/2">
                    <StratPage auth={this.props.auth} stratId={2} />
                </Route>

                <Route path="/strategy/3">
                    <StratPage auth={this.props.auth} stratId={3} />
                </Route>

                <Redirect exact from="/strategy" to="/strategy/1" />
              </>
          )
      }
  }

const mapStateToPropos = (state) => {
    return {
      auth: state.firebase.auth
    }
}

export default connect(mapStateToPropos)(Strategy);

