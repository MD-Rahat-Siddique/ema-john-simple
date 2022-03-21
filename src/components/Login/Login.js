import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import firebaseConfig from './firebase.config';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, FacebookAuthProvider } from "firebase/auth";
import { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Login() {
  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  // Line Numbers - 16, 17, 19, 130 (I have added by my own);
  const location = useLocation();
  const navigate = useNavigate();
  // 
  const from = location.state?.from?.pathname || "/";

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const handleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(signedInUser);
        console.log(result);
      })
      .catch(error => {
        console.log(error);
        console.log(error.message);
      })
  }

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false
        }
        setUser(signedOutUser);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }


  // Authentication Form : 

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      console.log('Submitting');
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(res => {
          // Signed in 
          // const user = userCredential.user;
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          // ...
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = 'The email is already in used by another user';
          newUserInfo.success = false;
          setUser(newUserInfo);
          // ..
        });
    }
    if (!newUser && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then(res => {
          // Signed in 
          // const user = userCredential.user;
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          console.log('sign in user info', res.user);
          // ...
          navigate(from, { replace: true });
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = 'The email is already in used by another user';
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  }

  const updateUserName = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        // Profile updated!
        console.log('user name updated successfully');
        // ...
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
        // ...
      });
  }

  // Facebook Sign In :
  const handleFbSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log('fb user after sign in', user);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  }

  return (
    <div>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Google sign out</button> : <button onClick={handleSignIn}>Google sign in</button>
      }
      <br />
      <button onClick={handleFbSignIn}>Facebook sign in</button>
      {
        user.isSignedIn && <div>
          <p>Welcome , {user.name}</p>
          <p>Your email : {user.email}</p>
          <img src={user.photo} alt="Profile"></img>
        </div>
      }

      <h2>Our Own Authentication</h2>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New user sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} id="" placeholder="Your name" required />}
        {newUser && <br />}
        <input type="text" name="email" onBlur={handleBlur} id="" placeholder="Your name" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} id="" placeholder="Password" required />
        <br />
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} successfully</p>
      }
    </div>
  );
}

export default Login;
