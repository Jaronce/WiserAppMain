import React, { Component } from 'react'
import ReviewPage from './ReviewPage'
import RevWeek from './RevWeek'
import { connect } from 'react-redux'

import {
    Redirect,
    Route
  } from "react-router-dom";
  
  export class Review extends Component {

      render() {
          return (
              <>
                
                <Route path="/review/1">
                    <ReviewPage auth={this.props.auth} insId={1} />
                </Route>

                <Route path="/review/2">
                    <ReviewPage auth={this.props.auth} insId={2} />
                </Route>

                <Route path="/review/3">
                    <ReviewPage auth={this.props.auth} insId={3} />
                </Route>
                
                
                <Redirect exact from="/review" to="/review/1" />
              </>
          )
      }
  }

const mapStateToPropos = (state) => {
    return {
      auth: state.firebase.auth
    }
}

export default connect(mapStateToPropos)(Review);

