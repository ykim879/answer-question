import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonPage,
  IonRouterOutlet,
  IonSearchbar,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { search, personOutline } from 'ionicons/icons';
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
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRef, useState } from 'react';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import QuestionPostPage from './components/QuestionPostPage';

setupIonicReact();

// firebase start
firebase.initializeApp({
  //private
});

const auth = firebase.auth();

const App: React.FC = () => {
  const [user] = useAuthState(auth);
  return (
    <section>
      {user ? <MainPage /> : <SignIn />}
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

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
    }
  }
  
  const handleInput = (ev: Event) => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();
    console.log("User queried user:" , query);
    if (query == '') {
      //redirect to selected tab
    } else {
      //redirect to UserSearchPage.
    }
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButton size="small" fill="outline" slot="start" onClick={() => auth.signOut()}>Sign Out</IonButton>
               <IonSearchbar debounce={1000} onIonInput={(ev: Event) => {handleInput(ev)}}></IonSearchbar>
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
                <UserPage email={email} />
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
            </IonTabBar>
          </IonTabs>
        </IonPage>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
