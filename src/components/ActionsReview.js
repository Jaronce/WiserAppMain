import React, { useState } from 'react'
import fbConfig from '../config/fbConfig'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Input, Label, Table , Card , Row , Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown,faAngleDown , faChevronCircleDown, faArrowsAlt, faEllipsisH, faCheck, faPlusCircle, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

const TaskRow = (props) => {
    const { item, getActions, id, index, lastIndex, content, updateTopAwaitIsight, insId } = props

    const [state, setState] = useState(item)

    const [modal, setModal] = useState(false);

    const [update, setUpdate] = useState(false);

    const toggle = () => {
        setUpdate(false)
        setModal(!modal)
    }


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
    }

    const handleDelete = async () => {

        const fbpath = "/review/"+ id + "/" + insId + "/actions/" + item.order;
        if(item) {
            fbConfig.database()
                .ref(fbpath)
                .remove()
                .then(res => {
                    setUpdate(false)
                    setModal(false)
    
                    getActions()
                })
        }
    }

    const handleSave = () => {

        const fbpath = "/review/"+ id + "/" + insId + "/actions/" + item.order;
        if(state && state !== item) {
            fbConfig.database()
                .ref(fbpath)
                .update({
                    order: item.order, header: state.header
                }).then(res => {
                    setUpdate(false)
                    setModal(false)
    
                    getActions()
                })
        }
    }

    const switchUp = () => {
        let tmp = {...content[index]}
        content[index] = {...content[index - 1]}
        content[index - 1] = tmp


        let tmpOrd = content[index].order
        content[index].order = content[index - 1].order
        content[index - 1].order = tmpOrd

        updateTopAwaitIsight(content)
    }

    const switchDown = () => {
        const tmp = content[index]
        content[index] = content[index + 1]
        content[index + 1] = tmp

        let tmpOrd = content[index].order
        content[index].order = content[index + 1].order
        content[index + 1].order = tmpOrd

        updateTopAwaitIsight(content)
    }

    const toggleUpdate = () => {
        setUpdate(true)
    }

    return (
        <>
            { 
                item.header != null ? 
                    <tr className="main-content__card-table-tab-body-row">
                        <th scope="row" className="main-content__card-table-tab-body-row-head" >
                            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '1.5rem'}}>
                                { index === 0 ? '' : <FontAwesomeIcon onClick={switchUp} style={{marginBottom: '-0.5rem', cursor: 'pointer'}} icon={faArrowUp} /> }
                                { index === lastIndex ? '' : <FontAwesomeIcon onClick={switchDown} style={{marginBottom: '-0.5rem', cursor: 'pointer'}} icon={faArrowDown} /> }
                            </div>
                        </th>
                        <td className="main-content__card-table-tab-body-row-main"><FontAwesomeIcon icon={faCheck} /> {item.header}</td>
                        <td onClick={toggle} className="main-content__card-table-tab-body-row-menu"><FontAwesomeIcon style={{cursor: 'pointer'}} icon={faEllipsisH} /></td>
                    </tr>
                :
                    <tr className="main-content__card-table-tab-body-row">
                        <th scope="row" className="main-content__card-table-tab-body-row-head" ><FontAwesomeIcon icon={faArrowsAlt} /></th>
                        <td className="main-content__card-table-tab-body-row-main"> No Results</td>
                    </tr>
            }
            <div className="wis-model" style={{display: modal ? 'block' : 'none'}} >
                <div className="wis-model__header">{ update ? 'Modify item' : 'Goal details'}</div>
                <div className="wis-model__body">
                    {
                        update ? 
                        <div class="wis-alert wis-alert-warning" role="alert">
                            Please click on update in order to save changes!
                        </div> : ''
                    }
                    <Form>
                        <FormGroup className="wis-model__group">
                            <Label className="wis-model__group-label" for="gratatudeAdd">What's your breakthrough goals?</Label>
                            {
                                update ?
                                    <Input onChange={handleChange} defaultValue={item.header} className="wis-model__group-input" type="text" name="header" id="header" />
                                    :
                                    <Input value={item.header} className="wis-model__group-input" type="text" name="header" id="header" />
                            }
                        </FormGroup>
                        
                    </Form>
                </div>
                <div className="wis-model__footer">

                    {
                        update ? 
                            <span onClick={handleSave} style={{backgroundColor: '#e37263'}} className="wis-model__footer-btn" color="primary" >Update</span>
                        :
                        <>
                            <span onClick={handleDelete} className="wis-model__footer-btn" color="primary" >Delete</span>
                            <span onClick={toggleUpdate} style={{backgroundColor: '#e37263'}}  className="wis-model__footer-btn" color="primary" >Modify</span>
                        </>
                    }
                    {' '}
                    <span className="wis-model__footer-btn wis-model__footer-btn-close" style={{backgrounfColor: '#1c2537'}} color="secondary" onClick={toggle}>Cancel</span>
                </div>
            </div>
            <div className="wis-model__overlay" style= {{display: modal ? 'block' : 'none'}}>
            

            </div>
        </>
    )
}

function Actions(props) {

    let { content, auth, getActions, updateTopAwaitIsight, insId, id } = props

    const [state, setState] = useState({
        items: [],
        action: '',
        day: '',
        timer : {
            days : '',
            hours : '',
        },
        createdAt : '',
        id: auth.uid
    })
    console.log('contennnnt ' , content)

    const [modal, setModal] = useState(false);


    const toggle = () => {
        setModal(!modal)
    }


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
    }
    const handleTimer = (e) => {
        setState({
            ...state,
            timer : {...state.timer , [e.target.name]: e.target.value}
        })

    }
    const toggleComplete = (item) => {
        const fbpath = "/review/"+ props.auth.uid + "/" + props.insId + "/actions/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            isComplete : !item.isComplete
                        }).then(res => {            
                            getActions()
                        })
    }

    const handleSubmit = async () => {
        let revActions = 0
        const fbpath1 = "/counters/" + auth.uid;

        let counters = await fbConfig.database()
                                .ref(fbpath1)
                                .once('value')

        counters = counters.val()

        revActions = counters.revActions
        revActions++

        const day = new Date(state.day).getTime()
        const item = {
            action: state.action,
            order: revActions,
            date: moment().format('dddd')
        }

        if (item) {
            const fbpath = "/review/"+ auth.uid + "/" + insId + "/actions/" + item.order;
            await fbConfig.database()
            .ref(fbpath)
            .set({
                order: item.order,
                action : state.action,
                timer : state.timer,
                day : day,
                date: moment().format(),
                createdAt : moment().format('YYYYMMDD h mm a'),
                isComplete : false
            })
            .then(snapshot => {
                fbConfig.database()
                .ref(fbpath1)
                .update({
                    revActions: revActions
                })
            });
            
        }

        await getActions()

        setModal(!modal)
        setState({
            ...state,
            action: '',
            day: '',
            timer : {
                days : '',
                hours : ''
            }
        })
    }


    return (
        <>
            
            

            <div className="review-board">
                <div className="review-board-grp">    
                    <span style={{cursor: 'pointer'}} className='review-board__btn'>Daily Habits</span>
                    <span style={{cursor: 'pointer'}} className='review-board__drop'>Choose Day <FontAwesomeIcon className="review-board__drop-icon" icon={faAngleDown} /></span>
                </div>  
                <span style={{cursor: 'pointer'}} className='review-board__btn'>View Past Reviews</span>
            </div>

            <Card className="review-card">
                <Table hover className="review-tab">
                    <thead>
                        <tr className="review-tab__head">
                            <th className="review-tab__head-item" align='Left'>Action</th>
                            <th className="review-tab__head-item" align='Left'>Day</th>
                            <th className="review-tab__head-item" align='Left'>Time</th>
                            <th className="review-tab__head-item" align='Left'>Timer Estimate</th>
                            <th className="review-tab__head-item" align='Left'>Timer Actual</th>
                            <th className="review-tab__head-item" align='Left'>Complete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content.length >0 ?
                            content.map((item, index) =>(<tr className="review-tab__row">
                            <td className="review-tab__row-item" scope="row">{item.action}</td>
                        <td className="review-tab__row-item">{moment(item.day).format('dddd')}</td>
                        <td className="review-tab__row-item">{item.timer.days} d / {item.timer.hours} h</td>
                        <td className="review-tab__row-item">{moment(item.createdAt.toString(), "YYYYMMDD h mm a").fromNow()}</td>
                            <td className="review-tab__row-item">{moment(item.day).endOf('day').fromNow() }</td>
                            <td className="review-tab__row-item">
                            <Input checked={item.isComplete} className="wis-model__group-input" type="checkbox" name="header" onChange={() => {toggleComplete(item)
                            item.isComplete = !item.isComplete}} />

                            </td>
                         
                        </tr>  )):<tr> <td className="review-tab__row-item" scope="row">Not Filled Yet</td>
                        <td className="review-tab__row-item"></td>
                        <td className="review-tab__row-item"></td>
                        <td className="review-tab__row-item"></td>
                            <td className="review-tab__row-item"></td>
                            <td className="review-tab__row-item"></td>   </tr>}
                     

                    </tbody>
                </Table>
            </Card>
            <div onClick={toggle} className="review-board-grp--left">    
                <span style={{cursor: 'pointer'}} className='review-board__btn review-board__btn'>Add Action</span>
            </div> 


            <div className="wis-model" style={{display: modal ? 'block' : 'none'}} isOpen={modal} toggle={toggle} >
                <div className="wis-model__header">Add new Action</div>
                <div className="wis-model__body">
                    <Form>
                        <FormGroup className="wis-model__group">
                            <Label className="wis-model__group-label" for="gratatudeAdd">Action Name :</Label>
                            <Input onChange={handleChange} className="wis-model__group-input" type="text" name="action" id="action" />
                        </FormGroup>
                        <FormGroup className="wis-model__group">
                            <Label className="wis-model__group-label" for="day">Day</Label>
                            <Input onChange={handleChange} className="wis-model__group-input" type="date" name="day" id="day" />
                        </FormGroup>
                                <FormGroup className="wis-model__group justify-content-between" >
                                    <Label className="wis-model__group-label" for="gratatudeAdd">Timers :</Label>  
                                    <div className='flex-row'>
                                        <Input placeholder="Days" onChange={handleTimer} style={{width: '45%', marginRight: '0'}} className="wis-model__group-input flex-col-2" type="number" name="days" id="days" />      
                                        <Input placeholder="Hours" onChange={handleTimer} style={{width: '45%', marginRight: '0'}} className="wis-model__group-input flex-col-2" type="number" name="hours" id="hours" />      
                                    </div>
                                </FormGroup>

                        
                    </Form>
                </div>
                <div className="wis-model__footer">
                    <span className="wis-model__footer-btn" color="primary" onClick={handleSubmit}>Add item</span>{' '}
                    <span className="wis-model__footer-btn wis-model__footer-btn-close" color="secondary" onClick={toggle}>Cancel</span>
                </div>
            </div>

            <div className="wis-model__overlay" style= {{display: modal ? 'block' : 'none'}}>
            

            </div>
        </>
    )
}

export default Actions