import React , {Component} from 'react'
import TopVictories from '../components/TopVictories'
import TopAwaitInsight from '../components/TopAwaitInsight'
import Actions from '../components/ActionsReview'

import { Input , Form , FormGroup , Label } from 'reactstrap';
import fbConfig from '../config/fbConfig'
import {Link} from 'react-router-dom'


export class ReviewPage extends Component {
    state = {
        topVictories: [],
        topAwaitInsight : [],
        actions : [],
        goal : 0,
        goalInput : 0

    }
    
    // BREAKTHROUGH GOALS
    getActions = async () => {
        const fbpath = "/review/"+this.props.auth.uid + "/" + this.props.insId + "/actions"

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                actions: items
            });
            console.log('reviewww issss', this.state.actions)
        });
    }

    updateActions = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/review/"+ this.props.auth.uid + "/" + this.props.insId + "/actions/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header
                        }).then(res => {            
                            this.getActions()
                        })
            })
        }
    }
    getTopVictories = async () => {
        const fbpath = "/review/"+this.props.auth.uid + "/" + this.props.insId + "/topVictories"

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                topVictories: items
            });
        });
    }

    updateTopVictories = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/review/"+ this.props.auth.uid + "/" + this.props.insId + "/topVictories/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header
                        }).then(res => {            
                            this.getTopVictories()
                        })
            })
        }
    }

    getTopAwaitInsight = async () => {
        const fbpath = "/review/"+this.props.auth.uid + "/" + this.props.insId + "/topAwaitInsight"

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                topAwaitInsight: items
            });
            console.log('reviewww issss', this.state.topVictories)
        });
    }

    updateTopAwaitInsight = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/review/"+ this.props.auth.uid + "/" + this.props.insId + "/topAwaitInsight/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, date: item.date
                        }).then(res => {            
                            this.getTopAwaitInsight()
                        })
            })
        }
    }

    getGoal =  () => {
        const fbpath = "/review/"+this.props.auth.uid + "/" + this.props.insId + "/goal"

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                goal : items
            });
        });
    }

    updateGoal = () => {
        const fbpath = "/review/"+ this.props.auth.uid + "/" + this.props.insId + "/goal";
        fbConfig.database()
                        .ref(fbpath)
                        .update({
                            goal : this.state.goalInput
                        }).then(res => {            
                            this.getGoal()
                        })
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    componentDidMount(){
        this.getTopVictories()
        this.getTopAwaitInsight()
        this.getActions()
        this.getGoal()
    }

    render(){
        const { goal } = this.state
        return(
            <>
            <div className="groupid">    
                    { this.props.insId === 1 ? <Link to='/review/1' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id-active'>ID 1</Link> : <Link to='/review/1' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id'>ID 1</Link> }
                    { this.props.insId === 2 ? <Link to='/review/2' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id-active'>ID 2</Link> : <Link to='/review/2' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id'>ID 2</Link> }
                    { this.props.insId === 3 ? <Link to='/review/3' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id-active'>ID 3</Link> : <Link to='/review/3' style={{cursor: 'pointer', textDecoration: 'none', color: '#A02A1B'}} className='groupid__id'>ID 3</Link> }
                </div>

            
            <Actions auth={this.props.auth} insId={this.props.insId} updateActions={this.updateActions} getActions={this.getActions} content={this.state.topVictories} content={this.state.actions}/>
            <TopVictories auth={this.props.auth} insId={this.props.insId} updateTopVictories={this.updateTopVictories} getTopVictories={this.getTopVictories} content={this.state.topVictories} />
            <TopAwaitInsight auth={this.props.auth} insId={this.props.insId} updateTopAwaitInsight={this.updateTopAwaitInsight} getTopAwaitInsight={this.getTopAwaitInsight} content={this.state.topAwaitInsight} />
            <div className="main-content__card">
                
                <div style={{marginTop: '4rem', padding: '0 1rem'}} className='flex-row'>
                    <div className='flex-col-2' style={{marginBottom: '4rem', width: '70%'}}>
                        <Form className="main-content__card-form flex-row">
                            <FormGroup className='flex-col-2'>
                                <Label className="main-content__card-form-label" for="name">Goal</Label>
                                <Input style={{width: '100%' , height : '10rem'}} className="main-content__card-form-input" type="textarea" name="goal" id="goalInput" onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup className='flex-col-2'>
                                <Input value={goal + ' $'} style={{width: '20rem', marginTop: '2rem', marginBottom: '3rem' }} className="main-content__card-form-input" type="text" name="goalAff" id="goalAff"/>
                                <span style={{cursor: 'pointer'}} className='review-board__btn review-board__btn' onClick={this.updateGoal}>Update</span>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className='flex-col-2' style={{width: '25%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: '4rem'}}>  
                        <Link to='/review/week' style={{cursor: 'pointer', textDecoration: 'none',}} className='review-board__btn review-board__btn'>Generate Weekly Review</Link>  
                    </div>
                    
                </div>
                
            </div>
            </>

        )
    }

}



export default ReviewPage