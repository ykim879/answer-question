import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import ContentBlockPage from '../components/ContentBlockFactory';
import { auth } from '../main';

const Tab1: React.FC = () => {
  let lastVisible = null;
  const { email } = auth.currentUser;

  return (
      <IonContent fullscreen>
        <ContentBlockPage lastVisible={lastVisible} email={email} page ="discoveryPage" />
      </IonContent>
  );
};

export default Tab1;
