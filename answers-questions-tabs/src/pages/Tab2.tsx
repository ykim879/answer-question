import { IonBackButton, IonBadge, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

import { firestore } from '../main';
import { useEffect, useState } from 'react';
import { Users } from '../TableTypes';
import ContentBlockPage from '../components/ContentBlockFactory';

interface ContainerProps {
  email: string;
  backButton: boolean;
}
interface UserProfileProps {
  email: string;
}

const UserPage: React.FC<ContainerProps> = ({ email, backButton }) => {
  let lastVisible = null;
  return (
    <IonContent>
      {backButton ? <IonCard className="backButton">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="userSearchPage">Back</IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonCard> : <></>}
      <UserProfile email={email} />
      <ContentBlockPage lastVisible={lastVisible} email={email} page ="userPage" />
    </IonContent>
  );
};

const UserProfile: React.FC<UserProfileProps> = ({ email }) => {
  const [userProfile, setUserProfile] = useState<Users>();

  useEffect(() => {
    firestore
      .collection("users")
      .doc(email)
      .get()
      .then((snap) => {
        return { ...snap.data() };
      })
      .then((user) => {
        if (user) {
          setUserProfile(user);
        }
      })
  }, []);
  return (
    <div className="profile">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{userProfile && userProfile.userName ? userProfile.userName : "Loading"}</IonCardTitle>
          <IonCardSubtitle>{email}</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          <IonList>
            <IonItem>
              <IonLabel>Followers</IonLabel>
              <IonBadge color="primary">{userProfile ? userProfile.followersCount : "Loading"}</IonBadge>
            </IonItem>
            <IonItem>
              <IonLabel>Followings</IonLabel>
              <IonBadge color="secondary">{userProfile ? userProfile.followingsCount : "Loading"}</IonBadge>
            </IonItem>
          </IonList>
        </IonCardContent>

      </IonCard>
    </div>
  );
}
export default UserPage;
