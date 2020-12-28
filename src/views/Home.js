import React, { useState } from 'react'
import {
    Switch,
    Link,
    Redirect,
    Route
  } from "react-router-dom";
import { Button, Form, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { logout } from '../store/actions/authActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faBell, faShareAlt, faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Who from './Who'
import Inspiration from './Inspiration'
import Strategy from './Strategy'
import Execution from './Execution'
import Review from './Review'
import RevWeek from './RevWeek'


const UserNavList = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const {item} = props

    return (
        <>
            <Button className={ isOpen ? 'home-nav__button-active' : 'home-nav__button' } color="primary" onClick={toggle} >
                <div className="home-nav__button-header">    
                    <span className={ isOpen ? 'home-nav__button-header--span-active' : 'home-nav__button-header--span' }>{item.titleChar}</span>
                    <span>{item.title}</span>
                </div>
                { isOpen ? <FontAwesomeIcon className="home-nav__button-icon" icon={faAngleDown} /> : <FontAwesomeIcon className="home-nav__button-icon" icon={faAngleRight} /> }
                
            </Button>
            { isOpen ? 
                <ul className="home-nav__list">
                    {item.items.map((el, index) => {
                        return <li key={index} className="home-nav__list-item"><Link style={{ textDecoration: 'none', color: 'white' }} to={item.path}>{el} </Link></li>
                    })}
                </ul>
                :
                ''
            }
        </>
    )
}


const Home = (props) => {

    const signOut = (e) => {
        e.preventDefault()
        props.logout()
    }

    const { auth, profile } = props
    console.log(profile)
    if (!auth.isLoaded)
      return <p>Loading...</p>
    if (!auth.uid)
      return <Redirect to="/login" />
    if (!profile.isLoaded)
      return <p>Loading...</p>

    const navList = [
        {
            titleChar: 'W',
            title: 'Who',
            path: '/who',
            items: ['A. Gratitude & Gifts', 'B. Passion Check', 'C. Identity Statements']
        },
        {
            titleChar: 'I',
            title: 'Inspiration',
            path: '/inspiration/1',
            items: ['A. Breakthrough Goals', 'B. Other Goals', 'C. Powerful Affirmations', 'D. Fear Managing']
        },
        {
            titleChar: 'S',
            title: 'Strategy',
            path: '/strategy',
            items: ['A. Resources', 'B. Strategize Actions', 'C. Challenge & Solutions', 'D. Mentor']
        },
        {
            titleChar: 'E',
            title: 'Execution',
            path: '/execution',
            items: ['A. Daily Habits', 'B. Key Actions', 'C. Tasks To Do']
        },
        {
            titleChar: 'R',
            title: 'Review',
            path: '/review',
            items: ['A. Daily Habits', 'B. Action Tracker', 'C. Top Victories', 'D. Top Take AwayInsight']
        }
    ]
    return (
        <>
            <div className="container__main">
                <nav className="main-sidebar">
                    <ul className="main-side-nav">
                        <li className="main-side-nav__item main-side-nav__item--active">
                            <Link className="main-side-nav__link" to='/'>
                                <img className="main-side-nav__link-icon" alt="icon" width="27" height="27" src="/img/home.svg" />
                            </Link>
                        </li>
                        <li className="main-side-nav__item main-side-nav__item--active">
                            <a href="/" className="main-side-nav__link">
                                <img className="main-side-nav__link-icon" alt="icon" width="27" height="27" src="/img/chat.svg" />
                            </a>
                        </li>
                        <li className="main-side-nav__item main-side-nav__item--active">
                            <a href="/" className="main-side-nav__link">
                                <img className="main-side-nav__link-icon" alt="icon" width="27" height="27" src="/img/profile.svg" />
                            </a>
                        </li>
                        <li className="main-side-nav__item main-side-nav__item--active">
                            <a href="/" className="main-side-nav__link">
                                <img className="main-side-nav__link-icon" alt="icon" width="27" height="27" src="/img/settings.svg" />
                            </a>
                        </li>
                        <li onClick={signOut} className="main-side-nav__item main-side-nav__item--active">
                            <a href="/" className="main-side-nav__link">
                                <img className="main-side-nav__link-icon" alt="icon" width="27" height="27" src="/img/engine.svg" />
                            </a>
                        </li>
                    </ul>
                </nav>
                <nav className="sec-sidebar">
                    <Form className="search">
                        <Label className="form__group-label" for="search__input">Search</Label>
                        <Input type="text" className="search__input" id="search__input" placeholder="Search here" />
                        <Button className="search__button">
                            <img alt="search icon" src="/img/search.svg" width="24" height="24" className="search__icon"></img>
                        </Button>
                    </Form>
                    <div className="home-nav">

                        { navList.map((item, index) => <UserNavList item={item} key={index} />) }

                    </div>
                </nav>
                <main className="main-view">
                    <nav className="user-nav">
                        <FontAwesomeIcon alt='share icon' style={{cursor: 'pointer'}} icon={faShareAlt} />
                        <FontAwesomeIcon alt='notifications icon' style={{cursor: 'pointer'}} icon={faBell} />
                        <FontAwesomeIcon alt='settings icon' style={{cursor: 'pointer'}} icon={faCog} />
                        <div className="user-nav__coach">
                            <img alt="coach img" src="/img/johnDoe.jpg" className="user-nav--profile-pic"></img>
                            <div className="user-nav__coach-group">
                                <span className="user-nav__coach-group-title">COACH</span>
                                <span className="user-nav__coach-group-name">Mark Steven</span>
                            </div>
                        </div>
                        <div className="user-nav__client">
                            <img alt="coach img" src="/img/annie.jpg" className="user-nav--profile-pic"></img>
                            <span className="user-nav__client-name">Hi, {profile.firstName}</span>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                    </nav>
                    <div className="main-content">

                        <Switch>

                            <Route exact path="/who">
                                <Who />
                            </Route>

                            <Route path="/inspiration">
                                <Inspiration />
                            </Route>

                            <Route path="/strategy">
                                <Strategy auth={props.auth}/>
                            </Route>

                            <Route path="/execution">
                                <Execution />
                            </Route>

                            <Route path="/review/week">
                                <RevWeek auth={props.auth}/>
                            </Route>
                            
                            <Route path="/review">
                                <Review />
                            </Route>
                            
                            <Redirect to="/who" />

                        </Switch>

                    </div>
                </main>
            </div>
        </>
    )
}

const mapStateToPropos = (state) => {
    return {
      auth: state.firebase.auth,
      profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToPropos, mapDispatchToProps)(Home);