import { IonButton, IonContent, IonItem, IonList, IonNavLink, IonSearchbar } from "@ionic/react";
import {firestore} from '../App'
import firebase from 'firebase/compat/app';
import { useState } from "react";
import UserPage from "./Tab2";
import "./Tab3.css";

const UserSearchPage = () => {
  const [result, setResult] = useState<string[]>([]);
  const handleInput = (ev: Event) => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();
    if (query) {
      firestore
        .collection("users")
        .where(firebase.firestore.FieldPath.documentId(), ">=", query)
        .limit(10)
        .get()
        .then((snap) => {
          let newItems: any[] = [];
          snap.docs.forEach((doc) => newItems.push(doc.id));
          return newItems
        })
        .then((users) => { setResult(users) });
    } else {
      setResult([]);
    };
  }

  return (
    <IonContent>
      <IonSearchbar className="search" animated={true} debounce={200} onIonInput={(ev: Event) => { handleInput(ev) }}></IonSearchbar>
      <IonList className="searchList">
        {result.map(content => {
          let href = "/tab2";
          return <IonNavLink routerDirection="forward" component={() => <UserNotAvailablePage/>}>
            <IonItem button>{content}</IonItem>
          </IonNavLink>
        })}
      </IonList>
    </IonContent>
  )
}

const UserNotAvailablePage = () => {
  return (
    <IonContent>
      User is Not Available
    </IonContent>
  )
}

export default UserSearchPage