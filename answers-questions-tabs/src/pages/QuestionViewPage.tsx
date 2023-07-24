import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonTextarea, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { QuestionBlock } from '../components/ContentBlockFactory';
import { useState } from 'react';
import firebase from "firebase/compat/app";
import {firestore} from "../main";

interface QuestionViewPageProps {
    email: string;
    type: string;
    question: string;
    questionRef: string;
}
const QuestionViewPage: React.FC<QuestionViewPageProps> = ({ email, type, question, questionRef }) => {
    return (
        <IonContent>
            <IonCard className="backButton">
                <IonToolbar >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="tab2">Back</IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonCard>

                <IonCard className="questionTopCard">
                    <QuestionBlock email={email} type={type} question={question} />
                </IonCard>
            <div className='contents'>
                <AnswerInputCard  email={email} question={question} questionRef={questionRef}/>
                {/*<AnswerBlocks lastVisible={lastVisible} email={email} />*/}
            </div>

        </IonContent>
    );
}

interface AnswerInputCardProps {
    email: string;
    question: string;
    questionRef: string;
} 

const AnswerInputCard: React.FC<AnswerInputCardProps> = ({email, question, questionRef}) => {
    const [answer, setAnswer] = useState('');
    const submit = async(e) => {
        firestore.collection('contents').add(
            {
              postedUserID: email,
              type: "answer",
              questionContent: question,
              questionRef: questionRef,
              answerContent: answer,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        setAnswer('');
    }
    return (
        <IonCard>
            <IonCardContent>
                <IonTextarea
                    label="Respond with your answer.."
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Enter text"
                    counter={true} maxlength={250}
                    autoGrow={true}
                    value = {answer}
                    onIonInput={(e) => setAnswer((e.target as HTMLTextAreaElement).value)}/>
                <IonButton size="small" onClick={submit}>Submit</IonButton>
            </IonCardContent>
        </IonCard>
    );
}

export default QuestionViewPage;