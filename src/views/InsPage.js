import React, { Component } from 'react'
import TaskTable from '../components/TaskTable'
import InspGoals from '../components/InspGoals'
import InspOthers from '../components/InspOthers'
import InspAffirms from '../components/InspAffirms'
import InspFears from '../components/InspFears'

import fbConfig from '../config/fbConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {faCaretDown} from '@fortawesome/free-solid-svg-icons'

import {
    Link,
  } from "react-router-dom";


export class InsPage extends Component {

    state = {
        goals: [],
        others: [],
        affirmations: [],
        fears: [],
    }
    

    // BREAKTHROUGH GOALS
    getGoals = async () => {
        const fbpath = "/inspiration/"+this.props.auth.uid + "/" + this.props.insId +"/goals"

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                goals: items
            });
        });
    }

    updateGoals = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/inspiration/"+ this.props.auth.uid + "/" + this.props.insId + "/goals/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, date: item.date
                        }).then(res => {            
                            this.getGoals()
                        })
            })
        }
    }

    // OTHER RELATED GOALS Others
    getOthers = async () => {
        const fbpath = "/inspiration/"+this.props.auth.uid + "/" + this.props.insId +"/others"

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                others: items
            });
        });
    }

    updateOthers = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/inspiration/"+ this.props.auth.uid + "/" + this.props.insId + "/others/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, date: item.date
                        }).then(res => {            
                            this.getOthers()
                        })
            })
        }
    }

    // POWERFUL AFFIRMATIONS
    getAffirms = async () => {
        const fbpath = "/inspiration/"+this.props.auth.uid + "/" + this.props.insId +"/affirmations"

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                affirmations: items
            });
        });
    }

    updateAffirms = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/inspiration/"+ this.props.auth.uid + "/" + this.props.insId + "/affirmations/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, date: item.date
                        }).then(res => {            
                            this.getAffirms()
                        })
            })
        }
    }



    // FEAR MANAGING 
    getFears = async () => {
        const fbpath = "/inspiration/"+this.props.auth.uid + "/" + this.props.insId +"/fears"

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                fears: items
            });
        });
    }

    updateFears = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/inspiration/"+ this.props.auth.uid + "/" + this.props.insId + "/fears/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, date: item.date
                        }).then(res => {            
                            this.getFears()
                        })
            })
        }
    }

    
    

    componentDidMount() {
        this.getGoals()
        this.getOthers()
        this.getAffirms()
        this.getFears()
    }


    render() {
        const { goals, others, affirmations, fears } = this.state
        const ID = this.props.insId
        return (

            <>
                <div className="groupid">    
                    { this.props.insId === 1 ? <Link to='/inspiration/1' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id-active'>Identity statement 1</Link> : <Link to='/inspiration/1' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id'>Identity statement 1</Link> }
                    { this.props.insId === 2 ? <Link to='/inspiration/2' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id-active'>Identity statement 2</Link> : <Link to='/inspiration/2' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id'>Identity statement 2</Link> }
                    { this.props.insId === 3 ? <Link to='/inspiration/3' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id-active'>Identity statement 3</Link> : <Link to='/inspiration/3' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id'>Identity statement 3</Link> }
                    
                </div>
                <div className="main-content__card-header">
                    <FontAwesomeIcon style={{ color: '#A09A9A' }} icon={faCaretDown} />
                    <span id='goals' className="main-content__card-header-title">Inspiration</span>
                </div>
                <InspGoals auth={this.props.auth} insId={ID} updateGoals={this.updateGoals} getGoals={this.getGoals} content={goals} />
                <InspOthers auth={this.props.auth} insId={this.props.insId} updateOthers={this.updateOthers} getOthers={this.getOthers} content={others} />
                <InspAffirms auth={this.props.auth} insId={this.props.insId} updateAffirms={this.updateAffirms} getAffirms={this.getAffirms} content={affirmations} />
                <InspFears auth={this.props.auth} insId={this.props.insId} updateFears={this.updateFears} getFears={this.getFears} content={fears} />
                {/* { compList.map((item, index) => <TaskTable content={item} key={index} />) } */}
            </>
        )
    }
}

export default InsPage