import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    Redirect,
    Route
} from "react-router-dom";

import ExecPage from './ExecPage'

  export class Execution extends Component {

      render() {
          return (
              <>
                <Route path="/execution/1">
                    <ExecPage auth={this.props.auth} execId={1} />
                </Route>

                <Route path="/execution/2">
                    <ExecPage auth={this.props.auth} execId={2} />
                </Route>

                <Route path="/execution/3">
                    <ExecPage auth={this.props.auth} execId={3} />
                </Route>

                <Redirect exact from="/execution" to="/execution/1" />
              </>
          )
      }
  }

const mapStateToPropos = (state) => {
    return {
      auth: state.firebase.auth
    }
}

export default connect(mapStateToPropos)(Execution);

