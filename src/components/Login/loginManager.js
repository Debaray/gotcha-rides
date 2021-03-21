import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
            
            const { displayName, photoURL, email } = result.user;
            const singedInUser = {
                isSignedIn: true,
                displayName : displayName,
                email: email,
                photo: photoURL,
                success:true
            }
            return singedInUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}


export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            console.log('faceBook',result);
            var user = result.user;
            user.success = true;
            return user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
}

export const handleSignedOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signOutUser = {
                isSignedIn: false,
                displayName: '',
                email: '',
                photo: '',
                error: '',
                success: false
            }
            return signOutUser;
        })
        .catch(err => {

        })
}
export const createUserWithEmailAndPassword = (name,email,password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            console.log(`User created`,res);
            // Signed in 
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}
export const signInwithEmailAndPassword =(email,password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      // Signed in
      // var user = res.user;
      console.log(`User signin`,res);
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
     return newUserInfo;
      // ...
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name

    }).then(function () {
      console.log('username updated successfully')
    }).catch(function (error) {
      // An error happened.
      console.log(error)
    });
  }


