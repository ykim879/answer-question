import { IonButton, IonTextarea } from "@ionic/react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {useState } from 'react';

firebase.initializeApp({
  //private
});

const firestore = firebase.firestore();

interface QuestionProps {
  email: string;
  modal: any;
}

const QuestionPostPage: React.FC<QuestionProps> = ({email, modal}) => {
    const [formValue, setFormValue] = useState('');
    const [questionValue, setQuestionValue] = useState('');
    const sendMessage = async(e) => {
      e.preventDefault();
      firestore.collection('contents').add(
        {
          postedUserID: email,
          type: "question",
          questionTitle: questionValue,
          questionContent: formValue,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
      );
      setFormValue('');
      modal.current?.dismiss()
    }
    //Todo: stretch goal: after submitting show alert.
    return (
      <>
      <form onSubmit = {sendMessage}>
        <IonTextarea label="Place your question title" placeholder="Enter your title of the question" value= {questionValue} onIonInput={(e) => setQuestionValue((e.target as HTMLTextAreaElement).value)} labelPlacement="floating" counter={true} maxlength={50}/>
      <IonTextarea label="Place your question"  placeholder="Enter your question" value= {formValue} onIonInput= {(e) => setFormValue((e.target as HTMLTextAreaElement).value)}  labelPlacement="floating" counter={true} maxlength={250} autoGrow={true}/>
      <IonButton slot= "bottom" type= "submit"> Submit </IonButton>
      </form>
      </>
    )
  }

  export default QuestionPostPage;