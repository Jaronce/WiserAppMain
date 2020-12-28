import React, { setState, Component } from 'react'
import { connect } from 'react-redux'

import {
    Link,
  } from "react-router-dom";

import fbConfig from '../config/fbConfig'

import ActionSteps from '../components/ActionSteps'
import Challenges from '../components/Challenges'
import Solutions from '../components/Solutions'
import Resources from '../components/Resources'
import WishList from '../components/WishList'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCaretDown} from '@fortawesome/free-solid-svg-icons'
import {Form , FormGroup , Label , Input } from 'reactstrap'



export class StratPage extends Component {

    state = {
        actionSteps: [],
        challenges : [],
        solutions : [], 
        resources : [],
        wishList : [],
    }
        

    getActionSteps = async () => {
        const fbpath = "/strategy/" + this.props.auth.uid + "/" + this.props.stratId + "/actionSteps"

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                actionSteps: items
            });
        });
    }

    updateActionSteps = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/strategy/" + this.props.auth.uid + "/" + this.props.stratId + "/actionSteps"
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, date: item.date
                        }).then(res => {            
                            this.getActionSteps()
                        })
            })
        }
    }

    getSolutions = async () => {
        const fbpath = "/strategy/" + this.props.auth.uid + "/" + this.props.stratId +"/solutions"

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                solutions: items
            });
        });
    }

    updateSolutions = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/strategy/" + this.props.auth.uid + "/" + this.props.stratId + "/solutions/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, date: item.date
                        }).then(res => {            
                            this.getSolutions()
                        })
            })
        }
    }

    getChallenges = async () => {
        const fbpath = "/strategy/" + this.props.auth.uid + "/" + this.props.stratId + "/challenges"

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                challenges: items
            });
        });
    }

    updateChallenges = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/strategy/" + this.props.auth.uid + "/" + this.props.stratId + "/challenges/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, date: item.date
                        }).then(res => {            
                            this.getChallenges()
                        })
            })
        }
    }

    getResources = async () => {
        const fbpath = "/strategy/" + this.props.auth.uid + "/" + this.props.stratId + "/resources"

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                resources: items
            });
        });
    }

    updateResources = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/strategy/" + this.props.auth.uid + "/" + this.props.stratId + "/resources/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, date: item.date
                        }).then(res => {            
                            this.getResources()
                        })
            })
        }
    }
    getWishList = async () => {
        const fbpath = "/strategy/" + this.props.auth.uid + "/" + this.props.stratId + "/wishList"

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                wishList: items
            });
        });
    }

    updateWishList = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/strategy/wishList/" + this.props.auth.uid + "/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, date: item.date
                        }).then(res => {            
                            this.getWishList()
                        })
            })
        }
    }

    componentDidMount() {
        this.getActionSteps()
        this.getChallenges()
        this.getSolutions()
        this.getResources()
        this.getWishList()

    }

  
    render() {
        return (
            <>
                <div className="groupid">    
                    { this.props.stratId === 1 ? <Link to='/strategy/1' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id-active'>ID 1</Link> : <Link to='/strategy/1' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id'>ID 1</Link> }
                    { this.props.stratId === 2 ? <Link to='/strategy/2' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id-active'>ID 2</Link> : <Link to='/strategy/2' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id'>ID 2</Link> }
                    { this.props.stratId === 3 ? <Link to='/strategy/3' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id-active'>ID 3</Link> : <Link to='/strategy/3' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id'>ID 3</Link> }   
                </div>
                <div className="main-content__card-header">
                    <FontAwesomeIcon style={{ color: '#A09A9A' }} icon={faCaretDown} />
                    <span id='passion' className="main-content__card-header-title">Strategy</span>
                </div>
                <div style={{marginBottom: '4rem'}} className='flex-row'>
                    {/* Resources */}
                    <Resources stratId={this.props.stratId} auth={this.props.auth} updateResources={this.updateResources} getResources={this.getResources} content={this.state.resources} />
                    {/* Resources ends */}
                    {/* WishList  */}
                    <WishList stratId={this.props.stratId} auth={this.props.auth} updateWishList={this.updateWishList} getWishList={this.getWishList} content={this.state.wishList} />
                    {/* WishList  */}
                
                </div>
                   
                <ActionSteps stratId={this.props.stratId} auth={this.props.auth} updateActionSteps={this.updateActionSteps} getActionSteps={this.getActionSteps} content={this.state.actionSteps} />
                <Challenges stratId={this.props.stratId} auth={this.props.auth} updateChallenges={this.updateChallenges} getChallenges={this.getChallenges} content={this.state.challenges} />
                <Solutions stratId={this.props.stratId} auth={this.props.auth} updateSolutions={this.updateSolutions} getSolutions={this.getSolutions} content={this.state.solutions} />
                {/* Mentor */}


                <div className="main-content__card">
                <div className="main-content__card-header">
                    <FontAwesomeIcon style={{ color: '#A09A9A' }} icon={faCaretDown} />
                    <span id='strategy' className="main-content__card-header-title">Mentor</span>
                </div>
                <div style={{marginTop: '4rem', padding: '0 1rem'}} className='flex-row'>
                    <div className='flex-col-2' style={{marginBottom: '4rem'}}>
                        <Form className="main-content__card-form">
                            <FormGroup>
                                <Label className="main-content__card-form-label" for="name">Name</Label>
                                <Input style={{width: '100%'}} className="main-content__card-form-input" type="text" name="username" id="name"/>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className='flex-col-2' style={{marginBottom: '4rem'}}>
                        <Form className="main-content__card-form">
                            <FormGroup>
                                <Label className="main-content__card-form-label" for="email">Email</Label>
                                <Input style={{width: '100%'}} className="main-content__card-form-input" type="email" name="email" id="email"/>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                
            </div>

            </>
        )
    }
}

const mapStateToPropos = (state) => {
    return {
      auth: state.firebase.auth
    }
}

export default connect(mapStateToPropos)(StratPage);