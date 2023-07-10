import { IonContent } from "@ionic/react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useState } from "react";


firebase.initializeApp({
    //private
  });
  
  const firestore = firebase.firestore();

  interface ContainerProps {
    email: string;
  }

const UserSearchPage: React.FC<ContainerProps> = ({ email }) => {

    const [searchUser, setSearchUser] = useState("");
    
    firestore
        .collection("users")
        .doc(email)
        .get()
        .then((snap) => {
          return {...snap.data()};
        })
        .then((user) => {
          if(user) {
            setSearchUser(email);
          } else {
            setSearchUser("");
          }
        })
    return (
        <>
        {searchUser ? <UserPage email= {searchUser}/> : <UserNotAvailablePage/>}
        </>
    )
}

const UserNotAvailablePage = () => {
    return (
        <IonContent>
            User is Not Available
        </IonContent>
    )
}

export default UserSearchPage;