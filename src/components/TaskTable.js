import React from 'react'
import { Table} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faChevronCircleDown, faArrowsAlt, faEllipsisH, faCheck, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const TaskRow = (props) => {
    const { item, headers } = props

    return (
        <>
            { 
                item.header != null ? 
                    <tr draggable className="main-content__card-table-tab-body-row">
                        <th scope="row" className="main-content__card-table-tab-body-row-head" ><FontAwesomeIcon icon={faArrowsAlt} /></th>
                        <td className="main-content__card-table-tab-body-row-main"><FontAwesomeIcon icon={faCheck} /> {item.header}</td>
                        { headers.map((head, index) => <td key={index} className="main-content__card-table-tab-body-row-other">{item[head.toLowerCase()]}</td>) }
                        <td className="main-content__card-table-tab-body-row-menu"><FontAwesomeIcon style={{cursor: 'pointer'}} icon={faEllipsisH} /></td>
                    </tr>
                :
                    <tr draggable className="main-content__card-table-tab-body-row">
                        <th scope="row" className="main-content__card-table-tab-body-row-head" ><FontAwesomeIcon icon={faArrowsAlt} /></th>
                        <td className="main-content__card-table-tab-body-row-main"> No Results</td>
                    </tr>
            }
        </>
    )
}

function TaskTable(props) {

    const { content } = props

    return (
        <div className="main-content__card">
            { content.title ?
                <div className="main-content__card-header">
                    <FontAwesomeIcon style={{ color: '#A09A9A' }} icon={faCaretDown} />
                    <span id={content.title} className="main-content__card-header-title">{content.title}</span>
                </div>
                : ''
            }
            <div className="main-content__card-table">
                <Table className="main-content__card-table-tab">
                    <thead className="main-content__card-table-tab-head">
                        <tr>
                            <th className="main-content__card-table-tab-head-icon"><FontAwesomeIcon icon={faChevronCircleDown} /></th>
                            <th className="main-content__card-table-tab-head-title">{content.text}</th>
                            { content.items.length > 0 ? content.headers.map((el, index) => <th key={index} className="main-content__card-table-tab-head-other">{el}</th>) : '' }
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="main-content__card-table-tab-body">
                        { content.items.length > 0 ? 
                            content.items.map((item, index) => <TaskRow headers={content.headers}  item={item} key={index} />)
                        :
                            <tr draggable className="main-content__card-table-tab-body-row">
                                <th scope="row" className="main-content__card-table-tab-body-row-head" ><FontAwesomeIcon icon={faArrowsAlt} /></th>
                                <td rowSpan={content.headers + 2} className="main-content__card-table-tab-body-row-main"> Not Filled Yet</td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </div>
            <div className="main-content__card-footer">
                <FontAwesomeIcon className="main-content__card-footer-icon" icon={faPlusCircle} />
                <span className="main-content__card-footer-text">New Line</span>
            </div>
        </div>
    )
}

export default TaskTable
