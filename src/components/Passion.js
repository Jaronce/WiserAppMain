import React, { useState } from 'react'
import fbConfig from '../config/fbConfig'
import moment from 'moment'

import {  Form, FormGroup, Input, Label, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faChevronCircleDown, faArrowsAlt, faEllipsisH, faCheck, faPlusCircle, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

const TaskRow = (props) => {
    const { item, getPassion, id, index, lastIndex, content, updatePassion } = props

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

        const fbpath = "/who/passion/" + id + "/" + item.order;
        if(item) {
            fbConfig.database()
                .ref(fbpath)
                .remove()
                .then(res => {
                    setUpdate(false)
                    setModal(false)
    
                    getPassion()
                })
        }
    }

    const handleSave = () => {

        const fbpath = "/who/passion/" + id + "/" + item.order;
        if(state && state !== item) {
            fbConfig.database()
                .ref(fbpath)
                .update({
                    order: item.order, header: state.header, date: state.date
                }).then(res => {
                    setUpdate(false)
                    setModal(false)
    
                    getPassion()
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

        updatePassion(content)
    }

    const switchDown = () => {
        const tmp = content[index]
        content[index] = content[index + 1]
        content[index + 1] = tmp

        let tmpOrd = content[index].order
        content[index].order = content[index + 1].order
        content[index + 1].order = tmpOrd

        updatePassion(content)
    }

    const toggleUpdate = () => {
        setUpdate(true)
    }

    console.log(content)

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
                <div className="wis-model__header">{ update ? 'Modify item' : 'Passion details'}</div>
                <div className="wis-model__body">
                    {
                        update ? 
                        <div class="wis-alert wis-alert-warning" role="alert">
                            Please click on update in order to save changes!
                        </div> : ''
                    }
                    <Form>
                        <FormGroup className="wis-model__group">
                            <Label className="wis-model__group-label" for="gratatudeAdd">What brings you the most joy?</Label>
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

function Passion(props) {

    let { content, auth, getPassion, updatePassion } = props

    const [state, setState] = useState({
        items: [],
        header: '',
        id: auth.uid
    })

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        let gratCount = 0
        const fbpath1 = "/counters/" + auth.uid;

        let counters = await fbConfig.database()
                                .ref(fbpath1)
                                .once('value')

        counters = counters.val()

        gratCount = counters.passion
        gratCount++

        const date = new Date()
        const item = {
            header: state.header,
            order: gratCount,
            date: date.getTime()
        }

        if (item) {
            const fbpath = "/who/passion/" + auth.uid + "/" + item.order;
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
                    passion: gratCount
                })
            });
            
        }

        await getPassion()
        
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
                <div className="main-content__card-header">
                    <FontAwesomeIcon style={{ color: '#A09A9A' }} icon={faCaretDown} />
                    <span id='passion' className="main-content__card-header-title">Passion</span>
                </div>
                <div className="main-content__card-table">
                    <Table className="main-content__card-table-tab">
                        <thead className="main-content__card-table-tab-head">
                            <tr>
                                <th className="main-content__card-table-tab-head-icon"><FontAwesomeIcon icon={faChevronCircleDown} /></th>
                                <th className="main-content__card-table-tab-head-title">Passions</th>
                                { content.length > 0 ? <th className="main-content__card-table-tab-head-other">DATE</th> : '' }
                                { content.length > 0 ? <th></th> : '' }
                            </tr>
                        </thead>
                        <tbody className="main-content__card-table-tab-body">
                            { 
                                content.length > 0 ? 
                                
                                content.map((item, index) => (
                                    <TaskRow updatePassion={updatePassion} content={content} lastIndex={content.length - 1} index={index} key={item.order} id={state.id} item={item} getPassion={getPassion} />
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
                <div className="wis-model__header">Add new passion</div>
                <Form onSubmit={handleSubmit}>
                    <div className="wis-model__body">
                            <FormGroup className="wis-model__group">
                                <Label className="wis-model__group-label" for="gratatudeAdd">What brings you the most joy?</Label>
                                <Input value={header} onChange={handleChange} className="wis-model__group-input" type="text" name="header" id="header" />
                            </FormGroup>
                    </div>
                    <div className="wis-model__footer">
                        <span className="wis-model__footer-btn" color="primary" onClick={handleSubmit}>Add item</span>{' '}
                        <span className="wis-model__footer-btn wis-model__footer-btn-close" color="secondary" onClick={toggle}>Cancel</span>
                    </div>
                </Form>
            </div>

            <div className="wis-model__overlay" style= {{display: modal ? 'block' : 'none'}}>
            

            </div>
        </>
    )
}

export default Passion
