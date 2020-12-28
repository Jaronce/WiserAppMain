import React, { Component } from 'react'
import { connect } from 'react-redux'
import fbConfig from '../config/fbConfig'

import Gratitude from '../components/Gratitude'
import Gift from '../components/Gift'
import Passion from '../components/Passion'
import Priorities from '../components/TopThree'
import Identities from '../components/IdentityState'


export class Who extends Component {

    state = {
        gratitude: [],
        gift: [],
        passion: [],
        priority: [],
        identity: [],
    }

    getGratitude = async () => {
        const fbpath = "/who/gratitude/" + this.props.auth.uid

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                gratitude: items
            });
        });
    }

    updateGratitude = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/who/gratitude/" + this.props.auth.uid + "/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, date: item.date
                        }).then(res => {            
                            this.getGratitude()
                        })
            })
        }
    }

    getGift = async () => {
        const fbpath = "/who/gift/" + this.props.auth.uid

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                gift: items
            });
        });
    }

    updateGift = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/who/gift/" + this.props.auth.uid + "/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, date: item.date
                        }).then(res => {            
                            this.getGift()
                        })
            })
        }
    }

    getPassion = async () => {
        const fbpath = "/who/passion/" + this.props.auth.uid

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                passion: items
            });
        });
    }

    updatePassion = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/who/passion/" + this.props.auth.uid + "/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, date: item.date
                        }).then(res => {            
                            this.getPassion()
                        })
            })
        }
    }

    getPriority = async () => {
        const fbpath = "/who/priority/" + this.props.auth.uid

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                priority: items
            });
        });
    }

    updatePriority = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/who/priority/" + this.props.auth.uid + "/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, date: item.date
                        }).then(res => {            
                            this.getPriority()
                        })
            })
        }
    }

    getIdentity = async () => {
        const fbpath = "/who/identity/" + this.props.auth.uid

        fbConfig.database()
        .ref(fbpath)
        .once('value')
        .then(snapshot => {
            var items = snapshot.val() ? Object.values(snapshot.val()) : [];
            this.setState({
                ...this.state,
                identity: items
            });
        });
    }

    updateIdentity = (items) => {
        if (items) {
            items.forEach(item => {
                const fbpath = "/who/identity/" + this.props.auth.uid + "/" + item.order;
                fbConfig.database()
                        .ref(fbpath)
                        .update({
                            order: item.order, header: item.header, coach: item.coach, date: item.date
                        }).then(res => {            
                            this.getIdentity()
                        })
            })
        }
    }

    componentDidMount() {
        this.getGratitude()
        this.getGift()
        this.getPassion()
        this.getPriority()
        this.getIdentity()
    }

    render() {
        return (
            <>
                <Gratitude auth={this.props.auth} updateGratitude={this.updateGratitude} getGratitude={this.getGratitude} content={this.state.gratitude} />

                <Gift auth={this.props.auth} updateGift={this.updateGift} getGift={this.getGift} content={this.state.gift} />

                <Passion auth={this.props.auth} updatePassion={this.updatePassion} getPassion={this.getPassion} content={this.state.passion} />
                
                <Priorities auth={this.props.auth} updatePriority={this.updatePriority} getPriority={this.getPriority} content={this.state.priority} />
                
                <Identities auth={this.props.auth} updateIdentity={this.updateIdentity} getIdentity={this.getIdentity} content={this.state.identity} />
            </>
        )
    }
}

const mapStateToPropos = (state) => {
    return {
      auth: state.firebase.auth
    }
}

export default connect(mapStateToPropos)(Who);