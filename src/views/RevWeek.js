import React, { Component } from 'react'

import { Card, Table, Input } from 'reactstrap';

import { Pie, Bar } from 'react-chartjs-2'

import fbConfig from '../config/fbConfig'


export class RevWeek extends Component {
    state = {
        goals : [],
        topVictories : [],
        planned : "" ,
    }
    getGoals =  () => {
        for (var i = 1; i < 4; i++){
            const fbpath = "/review/"+this.props.auth.uid + "/" + i + "/goal"
            fbConfig.database()
                .ref(fbpath)
                .once('value')
                .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            var goals = this.state.goals
            goals.push(items)
            this.setState({
                ...this.state,
                goals
            });
        });
        }
        
    }

    getActions =  () => {
        let planned = 0
        let completed = 0



        for (var i = 1; i < 4; i++){
            const fbpath = "/review/"+this.props.auth.uid + "/" + i + "/actions"
            fbConfig.database()
                .ref(fbpath)
                .once('value')
                .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            planned = planned + items.length
            var CompletedArr = items.filter((item)=> item.isComplete == true)
            completed = completed + CompletedArr.length
            this.setState({
                ...this.state,
                planned,
                completed
                });

             });

        }
        
    }


    getVictories =  () => {
        for (var i = 1; i < 4; i++){
            const fbpath = "/review/"+this.props.auth.uid + "/" + i + "/topVictories"
            fbConfig.database()
                .ref(fbpath)
                .once('value')
                .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            var topVictories = this.state.topVictories
            topVictories.push(items)
            this.setState({
                ...this.state,
                topVictories
            });
        });
        }
        
    }

    componentDidMount(){
        this.getGoals()
        this.getVictories()
        this.getActions()
    }

    render() {
        const {completed , planned} = this.state
        console.log( planned)
        const data1 = {
            labels: ['planned', 'Complete'],
            datasets: [
              {
                label: 'Actions',
                data: [planned, completed],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
              },
            ],
        }

        const data2 = {
            labels: ['Id 1', 'Id 2', 'Id 3'],
            datasets: [
              {
                label: 'Identity hours',
                data: [24, 14, 21],
                backgroundColor: [
                    'rgba(225, 11, 178, 0.2)',
                    'rgba(65, 83, 241, 0.2)',
                    'rgba(90, 40, 143, 0.2)'
                ],
                borderColor: [
                    '#E10BB2',
                    '#4153F1',
                    '#5A288F'
                ],
                borderWidth: 1,
              },
            ],
        }

        const dataBar = {
            labels: ['1', '2', '3', '4', '5', '6', '7'],
              datasets: [
                {
                  label: 'Goal',
                  backgroundColor: ['rgba(227, 114, 99, 0.5)', 'rgba(227, 114, 99, 0.5)', 'rgba(227, 114, 99, 0.5)', 'rgba(227, 114, 99, 0.5)','rgba(227, 114, 99, 0.5)', 'rgba(227, 114, 99, 0.5)', 'rgba(227, 114, 99, 0.5)'],
                  data: [850, 800, 322, 550, 700, 200, 367, 0],
                },
            ],
        }
        return (
            <>
                <Card className="review-card" style={{marginBottom: '6rem'}}>
                    <Table hover className="review-tab">
                        <thead>
                            <tr className="review-tab__head">
                                <th className="review-tab__head-item" align='Left'>Identity N°</th>
                                <th className="review-tab__head-item" align='Left'>Goal</th>
                                <th className="review-tab__head-item" align='Left'>Last week</th>
                                <th className="review-tab__head-item" align='Left'>This week</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.goals.map((item , index)=>(
                                <tr className="review-tab__row">
                                <td className="review-tab__row-item" scope="row">Identity {index + 1}</td>
                            <td className="review-tab__row-item">{item}</td>
                                <td className="review-tab__row-item">{item} </td>
                                <td className="review-tab__row-item">{item} </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>

                <div className='review-victory flex-row' style={{marginBottom: '4rem'}}>
                
                    
                    {this.state.topVictories.map((victory , index)=>(<div className='flex-col-3'>
                        <div>
                            <span className='review-victory__header'>IDENTITY {index + 1} - TOP VICTORIES</span>
                            <ul className='review-victory__list'>
                                {victory.length > 0 ? victory.map((item , index)=>(<li className='review-victory__list-item'>.{index + 1} {item.header}</li>))
                            : 
                                <li className='review-victory__list-item'>No data</li>
                            }
                            
                                
                            </ul>
                        </div>
                    </div>) )}
                    
                    
                </div>

                <div className='review-victory flex-row' style={{marginBottom: '4rem'}}>
                
                    <div>
                        <span className='review-victory__header' style={{width: '10rem'}} >TOP INSIGHTS</span>
                        <Input style={{width: '30rem'}} type='textarea' className='review-victory__input' />
                    </div>
                    <div>
                        <span className='review-victory__header' style={{width: '10rem'}} >TOP INSIGHTS</span>
                        <Input style={{width: '30rem'}} type='textarea' className='review-victory__input' />
                    </div>
                    <div>
                        <span className='review-victory__header' style={{width: '10rem'}} >TOP INSIGHTS</span>
                        <Input style={{width: '30rem'}} type='textarea' className='review-victory__input' />
                    </div>
                    
                    
                </div>

                <div className='flex-row' style={{marginBottom: '6rem'}} >

                    <div className='review-chart flex-col-2'>
                        <Pie data={data1} />

                        <ul className='review-victory__list' style={{margin: '0 auto', marginTop: '2rem'}}>
                            <li className='review-victory__list-item'>Actions Planned: {planned}</li>
                            <li className='review-victory__list-item'>Actions Complete: {completed}</li>
                        </ul>
                    </div>

                    <div className='review-chart flex-col-2'>
                        <Pie data={data2} />

                        <ul className='review-victory__list' style={{margin: '0 auto', marginTop: '2rem'}} >
                            <li className='review-victory__list-item'>Identity 1 hours: 24</li>
                            <li className='review-victory__list-item'>Identity 2 hours: 14</li>
                            <li className='review-victory__list-item'>Identity 3 hours: 21</li>
                        </ul>
                    </div>

                </div>

                <Bar data={dataBar} />

                <ul className='review-victory__list' style={{margin: '2rem auto',  width: '100%'}} >
                    <li className='review-victory__list-item' style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 4rem'}}>
                        <span>Week 1</span>  
                        <span>3</span> 
                        <span>3</span>   
                    </li>
                    <li className='review-victory__list-item' style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 4rem'}}>
                        <span>Week 2</span>  
                        <span>4</span> 
                        <span>3</span>   
                    </li>
                    <li className='review-victory__list-item' style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 4rem'}}>
                        <span>Week 3</span>  
                        <span>5</span> 
                        <span>4</span>   
                    </li>
                    <li className='review-victory__list-item' style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 4rem'}}>
                        <span>Week 4</span>  
                        <span>7</span> 
                        <span>4</span>   
                    </li>
                </ul>
                <div className="review-board-grp--left">    
                    <span style={{cursor: 'pointer', marginRight: '1rem'}} className='review-board__btn review-board__btn'>Generate PDF</span>
                    <span style={{cursor: 'pointer'}} className='review-board__btn review-board__btn'>Celebrate and Share</span>
                </div> 

            </>
        )
    }
}

export default RevWeek
