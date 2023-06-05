import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
//import { useCollectionData} from 'react-firebase-hooks/firestore';


firebase.initializeApp({
// private
});

const auth = firebase.auth();
//const firestore = firebase.firestore();



function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        Is this working?
      </header>
       <section>
        {user ? <p>User is here</p> : <SignIn/>}
      </section> 
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }
  return (
    <button onClick={signInWithGoogle}>Sing In With Google</button>
  )
}

// function SignOut() {
//   return auth.currentUser && (
//     <button onClick={() => auth.signOut()}>Sign Out</button>
//   )
// }

// function Discover() {

//   return (
//     <SignOut></SignOut>
//   )
// }

export default App;
