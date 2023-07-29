import { IonButton, IonContent, IonItem, IonList, IonNavLink, IonSearchbar } from "@ionic/react";
import {firestore} from '../main'
import firebase from 'firebase/compat/app';
import React, { useState } from "react";
import UserPage from "./Tab2";
import "./Tab3.css";
import GroupPage from "./GroupPage";

interface SearchItemProps {
  id: string;
  type: string;
}

const UserSearchPage = () => {
  const [result, setResult] = useState<SearchItemProps[]>([]);
  const handleInput = (ev: Event) => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value;
    if (query) {
      console.log(query)
      firestore
        .collection("users")
        .where(firebase.firestore.FieldPath.documentId(), ">=", query)
        .limit(10)
        .get()
        .then((snap) => {
          let newItems: any[] = [];
          snap.docs.forEach((doc) => newItems.push({ id : doc.id, type: doc.data().type}));
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
          return <IonNavLink routerDirection="forward" component={() => <SearchItem id={content.id} type = {content.type}/>}>
            <IonItem button>{content.id}</IonItem>
          </IonNavLink>
        })}
      </IonList>
    </IonContent>
  )
}

const SearchItem: React.FC<SearchItemProps> = ({id, type}) => {
  return (
    <>
    {type === "group" ? <GroupPage id = {id}/> : <UserPage email={id} backButton = {true}/> }
    </>
  )
}

export default UserSearchPage