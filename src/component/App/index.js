import {login, getToken} from 'lib/globalUtil';
import React, {Component} from 'react';
import ContentLayout from 'component/ContentLayout';
import HeaderSection from 'component/HeaderSection';
import CareerSection from 'component/CareerSection';
import TechSkillSection from 'component/TechSkillSection';
import CertSection from 'component/CertSection';
const {firebase} = window;

const spacerStyle = {
  height: 40,
};
const Spacer = () => <div style={spacerStyle} />;

const Sections = [HeaderSection, CareerSection, TechSkillSection, CertSection];

class App extends Component {
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
    const {init, authorized, invalidToken, data} = this.state;
    if (!init) return null;
    if (!authorized) {
      return (
        <div>
          <div>You are not authorized to view this content</div>
          {(invalidToken && <div>Invalid access token</div>) || null}
        </div>
      );
    }
    return (
      <ContentLayout>
        {Sections.map((Renderer, i) => (
          <div key={i}>
            {(i && <Spacer />) || null}
            <Renderer data={data} />
          </div>
        ))}
      </ContentLayout>
    );
  }
}

export default App;
