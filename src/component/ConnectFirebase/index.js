import React, {Component} from 'react';
import {login, getToken} from 'lib/globalUtil';
const {firebase, ga} = window;

const ConnectFirebase = BaseComponent =>
  class extends Component {
    state = {
      init: false,
      authorized: false,
      invalidToken: false,
    };
    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          return login();
        }
        const {uid} = firebase.auth().currentUser;
        let newToken;
        Promise.resolve(getToken())
          .then(nt => {
            newToken = nt;
            const {origin, pathname} = location;
            window.history.replaceState('', document.title, origin + pathname);
            if (newToken) {
              return firebase
                .database()
                .ref(`/users/${uid}/token`)
                .set(newToken)
                .then(() => newToken)
                .catch(err =>
                  firebase
                    .database()
                    .ref(`/users/${user.uid}/token`)
                    .once('value')
                    .then(snap => snap.val()));
            }
            return firebase
              .database()
              .ref(`/users/${user.uid}/token`)
              .once('value')
              .then(snap => snap.val());
          })
          .then(token => {
            if (newToken && newToken !== token) {
              this.setState({
                invalidToken: true,
              });
            }
            return Promise.all([
              token &&
                firebase
                  .database()
                  .ref(`/tokens/${token}`)
                  .once('value')
                  .then(snap => snap.val()),
              firebase
                .database()
                .ref(`/info`)
                .once('value')
                .then(snap => snap.val()),
            ])
              .then(([token, base]) => {
                const data = {
                  ...(base || {}),
                  ...((token && token.info) || {}),
                };
                this.setState({
                  init: true,
                  authorized: true,
                  data,
                });
                const {name} = data;
                document.title = name;
                const {group} = token;
                if (group) {
                  ga('send', 'event', 'View', 'Group', group);
                }
              })
              .catch(() => {
                this.setState({
                  init: true,
                });
              });
          })
          .catch(err => console.log(err));
      });
    }
    render() {
      const {props, state: injectedProps} = this;
      return <BaseComponent {...injectedProps} {...props} />;
    }
  };

export default ConnectFirebase;
