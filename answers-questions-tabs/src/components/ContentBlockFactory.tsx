//in the contentBlock parameter has reference and by firestore use reference to get data. if the type is question only post question if it is answer with user's answer and question
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonLoading, IonSpinner } from "@ionic/react";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useEffect, useState } from "react";
import { Content } from "../TableTypes";
import './ExploreContainer.css';

firebase.initializeApp({
    //private
  });
  
  const firestore = firebase.firestore();

interface ContentBlockPageProps {
    lastVisible: any;
    email: string;
}

const ContentBlockPage: React.FC<ContentBlockPageProps> = ({lastVisible, email}) => {

    const [contents, setContents] = useState<Content[]>();
    useEffect(() => {

    let questionQuery = firestore
      .collection("contents")
      .where("postedUserID", "==", email)
      .orderBy("timestamp", "desc");
    if (lastVisible) {
      questionQuery = questionQuery.startAfter(lastVisible);
    } //Todo: static variable: lastVisible
    questionQuery.limit(5).get()
    .then((snap) => {
        let newItems: any[] = [];
        snap.docs.forEach((doc) => newItems.push({id: doc.id, ...doc.data()}));
        return newItems
      })
    .then((contents) => {
        console.log(contents)
        setContents(contents)
    }
    );
    }, [])

    return (
        <div className="contents">
            {contents? contents.map(content => <ContentBlockFactory content= {content}/>) : <LoadingContentBlocks/>}
        </div>
    )

}
function LoadingContentBlocks() {
    return (
        <>
        <LoadingContentBlock/>
        <LoadingContentBlock/>
        <LoadingContentBlock/>
        <LoadingContentBlock/>
        <LoadingContentBlock/>
        </>
    )
}
function LoadingContentBlock() {
    return (
        <IonCard>
            <IonCardHeader className="center">
            <IonSpinner name="dots"></IonSpinner>
          </IonCardHeader>
        </IonCard>
    )
}
//go to page: load all answers of the question -->> need pagination (we need one more content for question-answer relation so that we can get reference and move smoothly to the page)
interface ContentFactoryProps {
    content: Content;
}
const ContentBlockFactory: React.FC<ContentFactoryProps> = ({ content }) => {
    // from firestore get data
    return (
        <IonCard>
            <QuestionBlock email={content.postedUserID} type= {content.type} questionTitle={content.questionContent} question={content.questionContent}/>
            { content.type == "answer" ? <AnswerBlock answer= {content.answer}/> : <IonContent/> }
        </IonCard>

    );
};
interface QuestionBlockProps {
    email: string;
    type: string;
    questionTitle: string;
    question: string;
}
const QuestionBlock: React.FC<QuestionBlockProps> = ({email, type, questionTitle, question}) => {
    return (
        <IonCardHeader>
            <IonCardTitle>{question}</IonCardTitle>
            <IonCardSubtitle>{email} posted {type} ...</IonCardSubtitle>
          </IonCardHeader>
    )
}

interface AnswerProps {
    answer: string;
}

const AnswerBlock: React.FC<AnswerProps> = ({answer}) => {
    return (
        <IonCardContent>
            {answer}
        </IonCardContent>
    )
}

function useCollectionOnce(query: any, options: any): [any, any, any] {
    throw new Error("Function not implemented.");
}

export default ContentBlockPage;