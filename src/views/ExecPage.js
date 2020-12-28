import React, { Component } from 'react'

import {
    Link,
  } from "react-router-dom";

import ExecHabits from '../components/ExecHabits'
import ExecActions from '../components/ExecActions'
import ExecTasks from '../components/ExecTasks'

import fbConfig from '../config/fbConfig'
import { connect } from 'react-redux'
import moment from 'moment'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'


export class ExecPage extends Component {

    state = {
        habits: [],
        actions: [],
        tasks: [],
        currentWeek: '',
        week: '',
        cWeek: '',
        lastWeek: '',
        nextWeek: '',
        index: 0,
        weeksHistory: [],
        modal: false
    }

    addNewWeek = async () => {
        let week = 0
        let weeksHistory = []

        const fbpath1 = "/counters/" + this.props.auth.uid

        let counters = await fbConfig.database()
                                .ref(fbpath1)
                                .once('value')

        counters = counters.val()

        week = counters.week[this.props.execId]
        week++

        // UPDATE CURRENT WEEK
        const currentWeek = new Date().getTime()
        const date = new Date()

        const fbpathCount = "/counters/" + this.props.auth.uid + "/exec/" + this.props.execId + "/" + currentWeek;
        await fbConfig.database()
                        .ref(fbpathCount)
                        .set({
                            habits: 0,
                            actions: 0,
                            tasks: 0
                        })

        // SAVE DATA
        let countWeek = counters.week
        countWeek[this.props.execId] = week

        let currWeek = counters.currentWeek
        currWeek[this.props.execId] = currentWeek
        fbConfig.database()
                .ref(fbpath1)
                .update({
                    week: countWeek,
                    currentWeek: currWeek
                }).then(snapshot =>{
                    const fbpath2 = fbpath1 + '/weeksHistory/' + this.props.execId + '/' + week
                    fbConfig.database()
                        .ref(fbpath2)
                        .set({
                            order: week,
                            date: currentWeek
                        })
                    this.getData()

                    this.setState({
                        ...this.state,
                        modal: false
                    })
            
                })
    }

    getHabits = async (week) => {
        let fbpath
        if (week) {
            fbpath = "/execution/" + this.props.auth.uid + "/" + this.props.execId + "/" + week + "/habits"
        } else {
            fbpath = "/execution/" + this.props.auth.uid + "/" + this.props.execId + "/" + this.state.cWeek + "/habits"
        }

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                habits: items
            });
        });
    }

    updateHabits = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/execution/" + this.props.auth.uid + "/" + this.props.execId + "/" + this.state.cWeek + "/habits/" + item.order
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, date: item.date
                        }).then(res => {            
                            this.getHabits()
                        })
            })
        }
    }

    getActions = async (week) => {
        let fbpath
        if (week) {
            fbpath = "/execution/" + this.props.auth.uid + "/" + this.props.execId + "/" + week + "/actions"
        } else {
            fbpath = "/execution/" + this.props.auth.uid + "/" + this.props.execId + "/" + this.state.cWeek + "/actions"
        }

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                actions: items
            });
        });
    }

    updateActions = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/execution/" + this.props.auth.uid + "/" + this.state.cWeek + "/actions/" + item.order
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, appointement: item.appointement, date: item.date
                        }).then(res => {            
                            this.getActions()
                        })
            })
        }
    }

    getTasks = async (week) => {
        let fbpath
        if (week) {
            fbpath = "/execution/" + this.props.auth.uid + "/" + this.props.execId + "/" + week + "/tasks"
        } else {
            fbpath = "/execution/" + this.props.auth.uid + "/" + this.props.execId + "/" + this.state.cWeek + "/tasks"
        }

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                tasks: items
            });
        });
    }

    updateTasks = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/execution/" + this.props.auth.uid + "/" + this.props.execId + "/" + this.state.cWeek + "/tasks/" + item.order
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, appointement: item.appointement, date: item.date
                        }).then(res => {            
                            this.getTasks()
                        })
            })
        }
    }

    getData = async () => {
        let week = 0
        let weeksHistory = []

        const fbpath1 = "/counters/" + this.props.auth.uid;

        let counters = await fbConfig.database()
                                .ref(fbpath1)
                                .once('value')

        counters = counters.val()

        const cWeek = new Date(counters.currentWeek[this.props.execId]).getTime()
        const currentWeek = new Date(counters.currentWeek[this.props.execId] + (604800000 * (counters.week[this.props.execId] - 1)))
        let nextWeek = currentWeek.getTime() + 604800000 // Had num wlh mana3ref lsl raha takhdem tzid b one week
        nextWeek = new Date(nextWeek)
        nextWeek = nextWeek.getTime()

        //const index = counters.weeksHistory.findIndex( el => el.date === counters.currentWeek )

        this.setState({
            ...this.state,
            week: counters.week[this.props.execId],
            lastWeek: counters.week[this.props.execId],
            currentWeek: currentWeek,
            cWeek: cWeek,
            nextWeek: nextWeek,
            weeksHistory: counters.weeksHistory[this.props.execId],
            index: counters.week[this.props.execId]
        })

        this.getHabits()
        this.getActions()
        this.getTasks()
    }

    previousWeek = () => {
        const prevIndex = this.state.index - 1

        const currentWeek = new Date(this.state.weeksHistory[prevIndex].date + (604800000 * (prevIndex - 1)))
        let nextWeek = this.state.currentWeek.getTime() + 604800000 // Had num wlh mana3ref lsl raha takhdem tzid b one week
        nextWeek = new Date(nextWeek)
        nextWeek = nextWeek.getTime()

        this.setState({
            ...this.state,
            week: prevIndex,
            nextWeek: this.state.currentWeek,
            currentWeek: currentWeek,
            cWeek: this.state.weeksHistory[prevIndex].date,
            index: prevIndex
        })

        this.getHabits(this.state.weeksHistory[prevIndex].date)
        this.getActions(this.state.weeksHistory[prevIndex].date)
        this.getTasks(this.state.weeksHistory[prevIndex].date)
    }

    nextWeek = () => {
        const nextIndex = this.state.index + 1

        const currentWeek = new Date(this.state.weeksHistory[nextIndex].date + (604800000 * (nextIndex - 1)))
        let nextWeek = currentWeek.getTime() + 604800000 // Had num wlh mana3ref lsl raha takhdem tzid b one week
        nextWeek = new Date(nextWeek)
        nextWeek = nextWeek.getTime()

        this.setState({
            ...this.state,
            week: nextIndex,
            nextWeek: nextWeek,
            currentWeek: currentWeek,
            cWeek: this.state.weeksHistory[nextIndex].date,
            index: nextIndex
        })

        this.getHabits(this.state.weeksHistory[nextIndex].date)
        this.getActions(this.state.weeksHistory[nextIndex].date)
        this.getTasks(this.state.weeksHistory[nextIndex].date)
    }

    toggle = () => {
        const modal = this.state.modal
        this.setState({
            ...this.state,
            modal: !modal
        })
    }

    componentDidMount() {
        this.getData()
    }

    render() {

        const { week, currentWeek, nextWeek,lastWeek, modal, habits, actions, tasks } = this.state

        return (
            <>
                <div className="groupid">    
                    { this.props.execId === 1 ? <Link to='/execution/1' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id-active'>ID 1</Link> : <Link to='/execution/1' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id'>ID 1</Link> }
                    { this.props.execId === 2 ? <Link to='/execution/2' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id-active'>ID 2</Link> : <Link to='/execution/2' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id'>ID 2</Link> }
                    { this.props.execId === 3 ? <Link to='/execution/3' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id-active'>ID 3</Link> : <Link to='/execution/3' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id'>ID 3</Link> }   
                </div>
                <div className="execution-header">
                    <div className="group-calendar">
                        <div className="group-calendar__pag">
                            { week > 1 ? <FontAwesomeIcon onClick={this.previousWeek} style={{ color: '#A09A9A', cursor: 'pointer' }} icon={faAngleLeft} /> : '' }
                            { week < lastWeek ? <FontAwesomeIcon onClick={this.nextWeek} style={{ color: '#A09A9A', cursor: 'pointer' }} icon={faAngleRight} /> : '' }
                        </div>
                        <span className="group-calendar__date">{moment(currentWeek).format('ll')} - {moment(nextWeek).format('ll')}</span>
                        <span className="group-calendar__week">Week {week}</span> 
                    </div>
                    { week === lastWeek ? <span onClick={this.toggle} className="group-calendar__btn">+ Create</span> : '' }

                    <div className="wis-model" style={{display: modal ? 'block' : 'none'}} >
                        <div className="wis-model__header">Add new execution week</div>
                        <div className="wis-model__body">
                            <div class="wis-alert wis-alert-warning" role="alert">
                                Are sure that you want to create new copy for this week ?
                            </div> 
                        </div>
                        <div className="wis-model__footer">
                            <span onClick={this.addNewWeek} style={{backgroundColor: '#e37263'}} className="wis-model__footer-btn" color="primary" >Create</span>
                            {' '}
                            <span className="wis-model__footer-btn wis-model__footer-btn-close" style={{backgrounfColor: '#1c2537'}} color="secondary" onClick={this.toggle}>Cancel</span>
                        </div>
                    </div>
                    <div className="wis-model__overlay" style= {{display: modal ? 'block' : 'none'}}>
                    

                    </div>
                </div>
                <ExecHabits execId={this.props.execId} auth={this.props.auth} content={habits} getHabits={this.getHabits} updateHabits={this.updateHabits} week={this.state.cWeek} />

                <ExecActions execId={this.props.execId} auth={this.props.auth} content={actions} getActions={this.getActions} updateActions={this.updateActions} week={this.state.cWeek} />

                <ExecTasks execId={this.props.execId} auth={this.props.auth} content={tasks} getTasks={this.getTasks} updateTasks={this.updateTasks} week={this.state.cWeek} />

            </>
        )
    }
}

const mapStateToPropos = (state) => {
    return {
      auth: state.firebase.auth
    }
}

export default connect(mapStateToPropos)(ExecPage);