import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

import {firestore} from '../App';
import { useEffect, useState } from 'react';
import { Users } from '../TableTypes';
import ContentBlockPage from '../components/ContentBlockFactory';

interface ContainerProps {
  email: string;
}

const UserPage: React.FC<ContainerProps> = ({ email }) => {
  let lastVisible = null;
  
  return (
    <IonContent>
      <UserProfile email={email}/>
      <ContentBlockPage lastVisible={lastVisible} email= {email}/>
    </IonContent>
  );
};
const UserProfile: React.FC<ContainerProps> = ({ email }) => {
  const [userProfile, setUserProfile] = useState<Users>();
  
  useEffect(() => {
    firestore
      .collection("users")
      .doc(email)
      .get()
      .then((snap) => {
        return {...snap.data()};
      })
      .then((user) => {
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
