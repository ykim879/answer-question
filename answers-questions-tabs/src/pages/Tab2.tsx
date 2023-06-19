import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

interface ContainerProps {
  email: string;
}

const UserPage: React.FC<ContainerProps> = ({email}) => {

  return (
      <IonContent fullscreen>
            <IonTitle size="large">{email}</IonTitle>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
  );
};

export default UserPage;
