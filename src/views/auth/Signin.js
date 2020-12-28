import React, { useState } from 'react'
import './auth.scss'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/actions/authActions';

const Signin = (props) => {

    const initialState = {
        email: '',
        password: ''
    }

    const [state, setState] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault();
        props.login(state);
    }

    const handleChange = (e) => {
        setState({
            ...state,
          [e.target.id]: e.target.value
        });
      }
    
    const { loginError, auth } = props;
    if (!auth.isLoaded)
    return <p>Loading ...</p>
    if (auth.uid)
    return <Redirect to="/" />

    return (
        <>
            <header className="header">
                <img alt="illustration" className="illustration" width="120" src="/img/logo.svg" />
            </header>
            <Container className="container__auth">
                <Row>
                    <Col md="4" className="side_1">
                        <Form onSubmit={handleSubmit} className="form">
                            <div className="form__heading">
                                <h2 className="form__heading-title">Welcome!</h2>
                                <p className="form__heading-text">Hey there, congratulations on taking this step towards optimizing your life! Many people talk about doing what you are about to do, but few do. Welcome to the family.</p>
                                {loginError ? <p style={{fontSize: '1.5rem', marginTop: '1rem'}} className="wis-alert wis-alert-warning"><FontAwesomeIcon className="home-nav__button-icon" icon={faExclamationTriangle} /> {loginError}</p> : null}
                            </div>
                            <FormGroup className="form__group">
                                <Label className="form__group-label" for="email">Email</Label>
                                <Input onChange={handleChange} className="form__group-input" type="email" name="email" id="email" placeholder="Email" />
                            </FormGroup>
                            <FormGroup className="form__group">
                                <Label className="form__group-label" for="password">Password</Label>
                                <Input onChange={handleChange} className="form__group-input" type="password" name="password" id="password" placeholder="Password" />
                            </FormGroup>
                            <FormGroup className="form__group-repass" inline>
                                <Label check>
                                    <Input type="checkbox" /> Remember me
                                </Label>
                                <a href="/">Forget Password?</a>
                            </FormGroup>
                            <FormGroup className="form__group-action"  inline>
                                <Button onClick={handleSubmit} color="primary" className="form__group-action-btn" id="active">Log In</Button>
                                <Button className="form__group-action-btn">Sign Up</Button>
                            </FormGroup>
                            <div className="form__footer">
                                <p className="form__footer-text">You can login using</p>
                                <div className="form__footer-group">
                                    <img className="form__footer-group-icon" alt="icon" width="40" height="40" src="/img/facebook.svg" />
                                    <img className="form__footer-group-icon" alt="icon" width="40" height="40" src="/img/insta.svg" />
                                    <img className="form__footer-group-icon" alt="icon" width="40" height="40" src="/img/google.svg" />
                                </div>
                            </div>
                        </Form>
                    </Col>
                    <Col md="8" className="side_2">
                        <img alt="illustration" className="illustration" width="800" height="507.12" src="/img/frame.svg" />
                    </Col>
                </Row>
            </Container>
            <img alt="background_illustrattion" className="illustration-back" width="200" height="200" src="/img/circle.svg" />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      loginError: state.auth.loginError,
      auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (creds) => dispatch(login(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);