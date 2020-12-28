import React, { Component } from 'react'
import InsPage from './InsPage'
import { connect } from 'react-redux'

import {
    Redirect,
    Route
  } from "react-router-dom";
  
  export class Inspiration extends Component {

      render() {
          return (
              <>
                <Route path="/inspiration/1">
                    <InsPage auth={this.props.auth} insId={1} />
                </Route>

                <Route path="/inspiration/2">
                    <InsPage auth={this.props.auth} insId={2} />
                </Route>

                <Route path="/inspiration/3">
                    <InsPage auth={this.props.auth} insId={3} />
                </Route>

                <Redirect exact from="/inspiration" to="/inspiration/1" />
              </>
          )
      }
  }

const mapStateToPropos = (state) => {
    return {
      auth: state.firebase.auth
    }
}

export default connect(mapStateToPropos)(Inspiration);

