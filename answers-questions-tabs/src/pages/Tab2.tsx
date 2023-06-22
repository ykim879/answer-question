import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useEffect, useState } from 'react';

firebase.initializeApp({
  //private
});

const firestore = firebase.firestore();

interface ContainerProps {
  email: string;
}

const UserPage: React.FC<ContainerProps> = ({ email }) => {
  
  return (
    <IonContent>
      <UserProfile email={email}/>
      <div className="container">

      </div>
    </IonContent>
  );
};
const UserProfile: React.FC<ContainerProps> = ({ email }) => {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    firestore
      .collection("users")
      .doc(email)
      .get()
      .then((snap) => {
        return {...snap.data()};
      })
      .then((user) => {
        console.log(user);
        if(user) {
          setUserProfile(user);
        }
      })
    }, []);
return (
  <div className="profile">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{userProfile && userProfile.userName? userProfile.userName : "Loading"}</IonCardTitle>
            <IonCardSubtitle>{email}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>Followers</IonLabel>
                <IonBadge color="primary">{userProfile? userProfile.followersCount : "Loading"}</IonBadge>
              </IonItem>
              <IonItem>
                <IonLabel>Followings</IonLabel>
                <IonBadge color="secondary">{userProfile? userProfile.followingsCount : "Loading"}</IonBadge>
              </IonItem>
            </IonList>
          </IonCardContent>

        </IonCard>
    </div>
);
}
export default UserPage;
