import fbConfig from '../../config/fbConfig'

export const login = (creds) => {
    return (dispatch, getState, { getFirebase }) => {
        console.log(creds)
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
            .then(() => {
                dispatch({ type: "LOGIN_SUCCESS" })
            })
            .catch(err => {
                dispatch({ type: "LOGIN_ERROR", err })
            });
    }
}

export const logout = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut()
            .then(() => {
                dispatch({ type: "LOGOUT_SUCCESS" });
            })
    }
}

export const clearMessages = () => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch({ type: "CLEAR_MESSAGES" });
    }
}

export const signup = (user) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        //const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(user.email.toLowerCase(), user.password.toLowerCase())
            .then((res) => {
                //console.log(res.uid)
                return fbConfig.firestore().collection("workers").doc(res.uid).set({
                    role: user.group,
                    email: user.email.toLowerCase(),
                    username: user.username.toLowerCase()
                })
            }).then(() => {
                dispatch({ type: "SIGNUP_SUCCESS" });
            }).catch((err) => {
                dispatch({ type: "SIGNUP_ERROR", err });
            })

    }
}


const reauthenticate = (currentPassword, firebase) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
}

export const changePassword = (oldPass, newPass) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        reauthenticate(oldPass, firebase)
            .then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(newPass).then(() => {
                    dispatch({ type: "CHANGE_PASS_SUCCESS" });
                }).catch((error) => {
                    dispatch({ type: "CHANGE_PASS_ERROR", error });
                });
            })
            .catch((error) => dispatch({ type: "CHANGE_PASS_ERROR", error }));
    }
}