import { Redirect, Route, useHistory } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonNav,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { search, personOutline, peopleOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import UserPage from './pages/Tab2';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


/* Firebase variables */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRef, useState } from 'react';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import QuestionPostPage from './components/QuestionPostPage';
import UserSearchPage from './pages/UserSearchPage';
import { auth } from './main';

setupIonicReact();

// firebase start



const App: React.FC = () => {
  
  const [user] = useAuthState(auth);

  return (
    <section>
      {user ?  <MainPage /> : <SignIn />}
    </section>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }
  return (
    <IonApp>
      <IonButton onClick={signInWithGoogle}>Sing In With Google</IonButton>
    </IonApp>
  )
}

function MainPage() {
  const [selectedTab, setSelectedTab] = useState("tab1");
  const modal = useRef<HTMLIonModalElement>(null);
  const { email } = auth.currentUser;
  const history = useHistory();

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
    }
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButton size="small" fill="outline" slot="start" onClick={() => auth.signOut()}>Sign Out</IonButton>
              <IonButton size="small" fill="outline" slot="end"  id="open-modal" expand="block">Post</IonButton>
            </IonToolbar>
          </IonHeader>

          <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Post Question</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <QuestionPostPage email = {email} modal = {modal}/>
          </IonContent>
        </IonModal>

          <IonTabs onIonTabsWillChange={e => setSelectedTab(e.detail.tab)}>
            <IonRouterOutlet>
              <Route exact path="/tab1">
                <Tab1 />
              </Route>
              <Route exact path="/tab2">
                <IonNav root={() =>  <UserPage email={email} backButton= {false} />}></IonNav>;
              </Route>
              <Route exact path="/userSearchPage">
                <IonNav root={() => <UserSearchPage />}></IonNav>;
              </Route>
              <Route exact path="/">
                <Redirect to="/tab1" />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon aria-hidden="true" icon={search} />
                <IonLabel>Discover</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon aria-hidden="true" icon={personOutline} />
                <IonLabel>User</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/userSearchPage">
                <IonIcon aria-hidden="true" icon={peopleOutline} />
                <IonLabel>Search</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonPage>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
