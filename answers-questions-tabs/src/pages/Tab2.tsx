import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

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
      <div className="profile">
      <IonCard>
          <IonCardHeader>
            <IonCardTitle>Name</IonCardTitle>
            <IonCardSubtitle>{email}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>Followers</IonLabel>
                <IonBadge color="primary">22k</IonBadge>
              </IonItem>
              <IonItem>
                <IonLabel>Followings</IonLabel>
                <IonBadge color="secondary">22k</IonBadge>
              </IonItem>
            </IonList>
          </IonCardContent>

        </IonCard>
        </div>
      <div className="container">
        
      </div>
    </IonContent>
  );
};

export default UserPage;
