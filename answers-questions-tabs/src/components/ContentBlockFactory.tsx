//in the contentBlock parameter has reference and by firestore use reference to get data. if the type is question only post question if it is answer with user's answer and question

import { IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";

//go to page: load all answers of the question -->> need pagination (we need one more content for question-answer relation so that we can get reference and move smoothly to the page)
interface ContentFactoryProps {
    reference: string;
}
const ContentBlockFactory: React.FC<ContentFactoryProps> = ({ reference }) => {
    // from firestore get data
    return (
        <div className="contentBlock">

        </div>

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