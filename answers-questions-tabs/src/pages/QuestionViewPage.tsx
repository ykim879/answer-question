import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonText, IonTextarea, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { LoadingContentBlocks, QuestionBlock } from '../components/ContentBlockFactory';
import { useEffect, useState } from 'react';
import firebase from "firebase/compat/app";
import { firestore } from "../main";
import { Content } from '../TableTypes';

interface QuestionViewPageProps {
    email: string;
    type: string;
    question: string;
    questionRef: string;
}
const QuestionViewPage: React.FC<QuestionViewPageProps> = ({ email, type, question, questionRef }) => {
    let lastVisible = null;
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
                <AnswerInputCard email={email} question={question} questionRef={questionRef} />
                <AnswerCards lastVisible={lastVisible} questionRef={questionRef} />
            </div>
        </IonContent>
    );
}

interface AnswerInputCardProps {
    email: string;
    question: string;
    questionRef: string;
}

const AnswerInputCard: React.FC<AnswerInputCardProps> = ({ email, question, questionRef }) => {
    const [answer, setAnswer] = useState('');
    const [isUserAnswered, setIsUserAnswered] = useState<boolean | null>(null);

    useEffect(() => {
        firestore.collection('contents')
            .where("questionRef", "==", questionRef)
            .where("postedUserID", "==", email)
            .limit(1)
            .get()
            .then(
                snap => {
                    if (snap.empty) {
                        setIsUserAnswered(false);
                    } else {
                        setAnswer(snap.docs.at(0)?.data().answerContent)
                        setIsUserAnswered(true);
                    }
                }
            )
    }
    )
    const submit = async (e) => {
        firestore.collection('contents').add(
            {
                postedUserID: email,
                type: "answer",
                questionContent: question,
                questionRef: questionRef,
                answerContent: answer,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        setIsUserAnswered(true);
    }
    return (
        <>
            {isUserAnswered == null ? <LoadingContentBlocks /> :
                <IonCard>
                    <IonCardContent>
                        {isUserAnswered ?
                        <IonText>{answer}</IonText>
                        :
                        <>
                            <IonTextarea
                                label="Respond with your answer.."
                                labelPlacement="floating"
                                fill="outline"
                                placeholder="Enter text"
                                counter={true} maxlength={250}
                                autoGrow={true}
                                value={answer}
                                onIonInput={(e) => setAnswer((e.target as HTMLTextAreaElement).value)} />
                            <IonButton size="small" onClick={submit}>Submit</IonButton>
                        </>
                        }
                    </IonCardContent>
                </IonCard>
            }
        </>
    );
}

interface AnswerCardsProps {
    lastVisible: any;
    questionRef: string;
}

const AnswerCards: React.FC<AnswerCardsProps> = ({ lastVisible, questionRef }) => {
    const [contents, setContents] = useState<Content[]>();
    useEffect(() => {

        let questionQuery = firestore
            .collection("contents")
            .where("questionRef", "==", questionRef)
            .orderBy("timestamp", "desc");
        if (lastVisible) {
            questionQuery = questionQuery.startAfter(lastVisible);
        } //Todo: static variable: lastVisible
        questionQuery.limit(5).get()
            .then((snap) => {
                let newItems: any[] = [];
                snap.docs.forEach((doc) => newItems.push({ id: doc.id, ...doc.data() }));
                return newItems
            })
            .then((contents) => {
                setContents(contents)
            });
    }, [])

    return (
        <div>
            {contents ? contents.map(content => <AnswerCard email={content.postedUserID} answer={content.answerContent} />) : <LoadingContentBlocks />}
        </div>
    )
}

interface AnswerCardProps {
    email: string;
    answer: string;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ email, answer }) => {
    return (
        <IonCard className='answerCard'>
            <IonCardHeader>
                <IonCardSubtitle>{email} answered.. </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                {answer}
            </IonCardContent>
        </IonCard>
    )

}
export default QuestionViewPage;