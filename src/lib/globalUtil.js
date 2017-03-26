const {firebase} = window;

const randBetween = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const charSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const randChar = () => charSet.charAt(randBetween(0, charSet.length));

const generateToken = length => {
  const res = [];
  for (; res.length < length; res.push(randChar())) {
  }
  return res.join('');
};

const gProv = new firebase.auth.GoogleAuthProvider();
const adminLogin = () => firebase.auth().signInWithPopup(gProv).catch(err => {
    alert('Error authenticating');
    throw err;
  });

const login = () => firebase.auth().signInAnonymously();

const signOut = () => firebase.auth().signOut().catch(err => {
    alert('Error signing out');
    throw err;
  });

const getToken = () => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === 'token') {
      return decodeURIComponent(pair[1]);
    }
  }
};

window.generateToken = generateToken;
window.adminLogin = adminLogin;
window.signOut = signOut;

export {login, signOut, getToken};
