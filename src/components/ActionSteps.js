import React, { useState } from 'react'
import fbConfig from '../config/fbConfig'
import moment from 'moment'

import {  Form, FormGroup, Input, Label, Table, Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown, faArrowsAlt, faEllipsisH, faCheck, faPlusCircle, faArrowUp, faArrowDown, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const TaskRow = (props) => {
    const { item, getActionSteps, id, index, lastIndex, content, updateActionSteps, stratId } = props

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

        const fbpath = "/strategy/" + id + "/" + stratId + "/actionSteps/" + item.order;
        if(item) {
            fbConfig.database()
                .ref(fbpath)
                .remove()
                .then(res => {
                    setUpdate(false)
                    setModal(false)
    
                    getActionSteps()
                })
        }
    }

    const handleSave = () => {

        const fbpath = "/strategy/" + id + "/" + stratId + "/actionSteps/" + item.order;
        if(state && state !== item) {
            fbConfig.database()
                .ref(fbpath)
                .update({
                    order: item.order, header: state.header, date: state.date
                }).then(res => {
                    setUpdate(false)
                    setModal(false)
    
                    getActionSteps()
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

        updateActionSteps(content)
    }

    const switchDown = () => {
        const tmp = content[index]
        content[index] = content[index + 1]
        content[index + 1] = tmp

        let tmpOrd = content[index].order
        content[index].order = content[index + 1].order
        content[index + 1].order = tmpOrd

        updateActionSteps(content)
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
                        <td className="main-content__card-table-tab-body-row-other">{moment(item.date).format('ll')}</td>
                        <td onClick={toggle} className="main-content__card-table-tab-body-row-menu"><FontAwesomeIcon style={{cursor: 'pointer'}} icon={faEllipsisH} /></td>
                    </tr>
                :
                    <tr className="main-content__card-table-tab-body-row">
                        <th scope="row" className="main-content__card-table-tab-body-row-head" ><FontAwesomeIcon icon={faArrowsAlt} /></th>
                        <td className="main-content__card-table-tab-body-row-main"> No Results</td>
                    </tr>
            }
            <div className="wis-model" style={{display: modal ? 'block' : 'none'}} >
                <div className="wis-model__header">{ update ? 'Modify item' : 'Action details'}</div>
                <div className="wis-model__body">
                    {
                        update ? 
                        <div class="wis-alert wis-alert-warning" role="alert">
                            Please click on update in order to save changes!
                        </div> : ''
                    }
                    <Form>
                        <FormGroup className="wis-model__group">
                            <Label className="wis-model__group-label" for="gratatudeAdd">What are the most important actions to take?</Label>
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

function ActionSteps(props) {

    let { content, auth, getActionSteps, updateActionSteps, stratId } = props

    const [state, setState] = useState({
        items: [],
        header: '',
        id: auth.uid
    })

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggleAction = () => setTooltipOpen(!tooltipOpen);

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

    const handleSubmit = async () => {
        let gratCount = 0
        const fbpath1 = "/counters/" + auth.uid;

        let counters = await fbConfig.database()
                                .ref(fbpath1)
                                .once('value')

        counters = counters.val()

        gratCount = counters.stratAct
        gratCount++

        const date = new Date()
        const item = {
            header: state.header,
            order: gratCount,
            date: date.getTime()
        }

        if (item) {
            const fbpath = "/strategy/" + auth.uid + "/" + stratId + "/actionSteps/" + item.order;
            await fbConfig.database()
            .ref(fbpath)
            .set({
                order: item.order,
                header: item.header,
                date: item.date
            })
            .then(snapshot => {
                fbConfig.database()
                .ref(fbpath1)
                .update({
                    stratAct: gratCount
                })
            });
            
        }

        await getActionSteps()
        
        setModal(!modal)
        setState({
            ...state,
            header: ''
        })
    }

    const header = state.header
    return (
        <>
            <div className="main-content__card">

                <div className="main-content__card-table">
                    <Table className="main-content__card-table-tab">
                        <thead className="main-content__card-table-tab-head">
                            <tr>
                                <th className="main-content__card-table-tab-head-icon"><FontAwesomeIcon icon={faChevronCircleDown} /></th>
                                <th className="main-content__card-table-tab-head-title">STRATEGIZE ACTION STEPS</th>
                                { content.length > 0 ? <th className="main-content__card-table-tab-head-other">DATE</th> : '' }
                                <th>
                                    <FontAwesomeIcon id='actionInfo' style={{ color: '#E37263', fontSize: '1.5rem', cursor: 'pointer' }} icon={faInfoCircle} />
                                    <Tooltip style={{color: 'white', padding: '0.5rem', backgroundColor: 'rgba(227, 114, 99, 0.8)', width: '30rem', marginBottom: '1rem', borderRadius: '0.5rem'}} placement="top" isOpen={tooltipOpen} target="actionInfo" toggle={toggleAction} >
                                        What are some key actions that will lead you toward your goal? Tip: think about your resources and how you may use them.
                                    </Tooltip>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="main-content__card-table-tab-body">
                            { 
                                content.length > 0 ? 
                                
                                content.map((item, index) => (
                                    <TaskRow stratId={stratId} updateActionSteps={updateActionSteps} content={content} lastIndex={content.length - 1} index={index} key={item.order} id={state.id} item={item} getActionSteps={getActionSteps} />
                                ))
                            :
                                <tr draggable className="main-content__card-table-tab-body-row">
                                    <th scope="row" className="main-content__card-table-tab-body-row-head" ><FontAwesomeIcon icon={faArrowsAlt} /></th>
                                    <td rowSpan='2' className="main-content__card-table-tab-body-row-main"> Not Filled Yet</td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </div>
                <div onClick={toggle} className="main-content__card-footer">
                    <FontAwesomeIcon className="main-content__card-footer-icon" icon={faPlusCircle} />
                    <span className="main-content__card-footer-text">New Line</span>
                </div>
            </div>

            <div className="wis-model" style={{display: modal ? 'block' : 'none'}} isOpen={modal} toggle={toggle} >
                <div className="wis-model__header">Add new action</div>
                <div className="wis-model__body">
                    <Form>
                        <FormGroup className="wis-model__group">
                            <Label className="wis-model__group-label" for="gratatudeAdd">What are the most important actions to take?</Label>
                            <Input value={header} onChange={handleChange} className="wis-model__group-input" type="text" name="header" id="header" />
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

export default ActionSteps
