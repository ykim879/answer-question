//in the contentBlock parameter has reference and by firestore use reference to get data. if the type is question only post question if it is answer with user's answer and question
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

firebase.initializeApp({
    //private
  });
  
  const firestore = firebase.firestore();

interface ContentBlockPageProps {
    lastVisible: any;
    email: string;
}

const ContentBlockPage: React.FC<ContentBlockPageProps> = ({lastVisible, email}) => {

    let questionQuery = firestore
      .collection("questions")
      .where("postedUserID", "==", email)
      .orderBy("timestamp", "desc");
    if (lastVisible) {
      questionQuery = questionQuery.startAfter(lastVisible);
    } //Todo: static variable: lastVisible
    questionQuery = questionQuery.limit(5);

    const [snapshot, loading, error] = useCollectionOnce(questionQuery,  { idField: 'id' })

    return (
        <div>
             {snapshot && snapshot.map(content => <ContentBlockFactory content = {content} />)}

        </div>
    )

}

//go to page: load all answers of the question -->> need pagination (we need one more content for question-answer relation so that we can get reference and move smoothly to the page)
interface ContentFactoryProps {
    cotent: Array<string>;
}
const ContentBlockFactory: React.FC<ContentFactoryProps> = ({ cotent }) => {
    // from firestore get data
    return (
        <IonCard>

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
            <IonCardTitle>{questionTitle}</IonCardTitle>
            <IonCardSubtitle>{email} posted {type} ...</IonCardSubtitle>
            <p>{question}</p>
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
