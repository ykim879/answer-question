import { useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { IonButton } from '@ionic/react';

firebase.initializeApp({
  //private
});

const firestore = firebase.firestore();
const auth = firebase.auth();

function ContentBlock() {
  const [contentBlocks, setContentBlocks] = useState([]);
  const [loadDisable, setLoadDisable] = useState(false);
  let keys = new Set();


  //for pagination
  let lastVisible = null;
  // todo: move to service
  const { email } = auth.currentUser;


  useEffect(() => {
    if (contentBlocks.length == 0) {
      loadData()
    }
    console.log("contentBlocks", contentBlocks)
  }, []);

  const loadData = async () => {
    let questionQuery = firestore
      .collection("questions")
      .where("postedUserID", "==", email)
      .orderBy("timestamp", "desc");
    if (lastVisible) {
      questionQuery = questionQuery.startAfter(lastVisible);
    }
    questionQuery = questionQuery.limit(5);

    console.log("query created")
    questionQuery.get()
      .then((querySnapshot) => {
        let newItems = [];
        querySnapshot.docs.forEach((doc) => {
          if (!keys.has(doc.id)) {
            newItems.push({
              id: doc.id,
              ...doc.data()
            })
            keys.add(doc.id);
          }
        });
        return newItems;
      })
      .then((newItems) => {
        if (newItems) {
          console.log("newItems ", ...newItems);
          setContentBlocks((prevBlocks) => [...prevBlocks, ...newItems]);
          lastVisible = newItems.at(-1);
          console.log("lastVisible", lastVisible);
          if (newItems.length < 5) {
            setLoadDisable(true);
          }
        } else {
          setLoadDisable(true);
        }
      })
  }

  return (
    <div id="contentBlockArea">
      <h1>Content Blocks</h1>
      {contentBlocks.map((block) => (
        <div key={block.id}>
          <p>{block.content}</p>
        </div>
      ))}
      <IonButton disabled={loadDisable} onClick={loadData}>Load More</IonButton>
    </div>
  );
}

export default ContentBlock;
