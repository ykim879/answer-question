import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData} from 'react-firebase-hooks/firestore';


import { useEffect, useState } from 'react';

//import {IonButton} from '@ionic/react';

firebase.initializeApp({
  //private data
});

const auth = firebase.auth();
const firestore = firebase.firestore();



function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
       <section>
        {user ? <Discover/> : <SignIn/>}
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

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function Discover() {
  return (
    <>
      <UserPage/>
      {/*<DiscoveryPage/>*/}
      <QuestionPostPage/>
      <SignOut></SignOut>
      {/*put tab here*/}
    </>
  )
}

function UserPage() {
  const userRef = firestore.collection('users');
  const query = userRef.where(firebase.firestore.FieldPath.documentId(), '==', 'user1').limit(1);
  const [userData] = useCollectionData(query);

  const questionRef = firestore.collection('questions');
  const questionQuery = questionRef.where(firebase.firestore.FieldPath.documentId(), '==', 'user1').limit(5);
  const [questionsList] = useCollectionData(questionQuery);

  const answersRef = firestore.collection('answers');
  const answersQuery = answersRef.where(firebase.firestore.FieldPath.documentId(), '==', 'user1').limit(1);
  const [answersList] = useCollectionData(answersQuery);
  return (
    <>
    {userData ? "userData is here" + JSON.stringify(userData[0]): "no userData"}
    <br></br>
    {questionsList && questionsList.length > 0? JSON.stringify(questionsList) : "there is no question posted by the user"}
    <br></br>
    {answersList && answersList.length > 0? JSON.stringify(answersList) : "there is no answers posted by the user"}
    </>
  )
}

//infinite loop in useState
//function DiscoveryPage() {
//   const [postData, setPostData] = useState([]);

//   const followingsRef = firestore.collection('followings');
//   const query = followingsRef.doc('user1');
//   const [followingData] = useCollectionData(query);

//   //Todo: pagination
//   useEffect(() => {
//     if (followingData) {
//       const fetchPosts = async () => {
//         const postRefs = followingData[0].posts; //followingData[0] is user's followings posts

//         const postsDataPromises = postRefs.map(async (postRef) => {
//           const postDoc = await postRef.get();

//           if (postDoc.exists) {
//             return postDoc.data();
//           }
//         });

//         const postsData = await Promise.all(postsDataPromises);
//         setPostData(postsData);
//       };

//       fetchPosts();
//     }
//   }, [followingData]);

//   return (
//     <div>
//       <h1>Following Posts</h1>
//       {postData && postData.length > 0? postData.map((post, index) => (
//         <div key={index}>
//           <h3>{post.title}</h3>
//           <p>{post.content}</p>
//         </div>
//       )): "no following posts"}
//     </div>
//   );
// }

function QuestionPostPage() {
  const [formValue, setFormValue] = useState('');
  const sendMessage = async(e) => {
    e.preventDefault();
    const {email} = auth.currentUser; //Todo: get the email from the user and put user by their id
    //todo from collection find user by userId 
    const questionRef = firestore.collection('questions').add(
      {
        postedUserID: email,
        content: formValue,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }
    );
    setFormValue('');
  }
  return (
    <>
    <form onSubmit = {sendMessage}>
    <input value= {formValue} onChange= {(e) => setFormValue(e.target.value)}/>
    <button type= "submit"> Submit </button>
    </form>
    </>
  )
}
//create discover page
export default App;
