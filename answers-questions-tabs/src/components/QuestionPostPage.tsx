import { IonAccordion, IonAccordionGroup, IonButton, IonItem, IonLabel, IonLoading, IonSpinner, IonTextarea } from "@ionic/react";
import firebase from "firebase/compat/app";
import { auth, firestore } from "../main";
import { useEffect, useRef, useState } from 'react';


interface QuestionProps {
  email: string;
  modal: any;
}

const QuestionPostPage: React.FC<QuestionProps> = ({ email, modal }) => {
  const [formValue, setFormValue] = useState('');
  const [questionValue, setQuestionValue] = useState('');

  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setGroup] = useState('');
  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);

  const [loading, setLoading] = useState(false);
  useEffect(
    () => {
      if (email) {
        firestore.collection('users').doc(email).get().then(snap => setGroupList(snap.data()?.followings))
      }
    }, [])

  const sendMessage = async (e) => {
    e.preventDefault();
    setFormValue('');
    setLoading(true);
    firestore.collection('users').doc(selectedGroup).get().then(
      snap => firestore.collection('contents').add(
        {
          postedUserID: email,
          type: "question",
          questionTitle: questionValue,
          questionContent: formValue,
          readers: snap.data()?.groupMembers,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    ).then(() => {
      setLoading(false);
      modal.current?.dismiss();
    });
  }

  const selectGroup = (group: string) => {
    setGroup(group);
    if (accordionGroup.current) {
      accordionGroup.current.value = undefined;
    }
  }
  //Todo: stretch goal: after submitting show alert.
  return (
    <>
      <form onSubmit={sendMessage}>
        <IonTextarea label="Place your question title" placeholder="Enter your title of the question" value={questionValue} onIonInput={(e) => setQuestionValue((e.target as HTMLTextAreaElement).value)} labelPlacement="floating" counter={true} maxlength={50} />
        <IonTextarea label="Place your question" placeholder="Enter your question" value={formValue} onIonInput={(e) => setFormValue((e.target as HTMLTextAreaElement).value)} labelPlacement="floating" counter={true} maxlength={250} autoGrow={true} />
        <IonAccordionGroup expand="inset" ref={accordionGroup}>
          <IonAccordion value="first">
            <IonItem slot="header" color="light">
              <IonLabel>{selectedGroup ? selectedGroup : "Select the group"}</IonLabel>
            </IonItem>
            {groupList ?
              <div className="ion-padding" slot="content">
                {groupList.map(group => <IonItem button onClick={() => selectGroup(group)}>{group}</IonItem>)}
              </div>
              : <IonSpinner name="dots"></IonSpinner>
            }
          </IonAccordion>
        </IonAccordionGroup>

        <IonButton slot="bottom" type="submit"
        disabled= {questionValue.length < 10 || formValue.length < 10 || selectedGroup.length == 0}> Submit </IonButton>
        
        <IonLoading isOpen={loading} message="Posting your question" duration={3000} />

      </form>
    </>
  )
}

export default QuestionPostPage;