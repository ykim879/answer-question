//in the contentBlock parameter has reference and by firestore use reference to get data. if the type is question only post question if it is answer with user's answer and question
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonLoading, IonNavLink, IonSpinner } from "@ionic/react";

import { firestore } from "../main"
import { useEffect, useState } from "react";
import { Content } from "../TableTypes";
import './ExploreContainer.css';
import QuestionViewPage from "../pages/QuestionViewPage";

interface ContentBlockPageProps {
    lastVisible: any;
    email: string;
    page: "userPage" | "discoveryPage" | "groupPage"
}

const ContentBlockPage: React.FC<ContentBlockPageProps> = ({ lastVisible, email, page }) => {

    const [contents, setContents] = useState<Content[]>();
    

    useEffect(() => {

        let questionQuery = page === "userPage" ? firestore
        .collection("contents")
        .where("postedUserID", "==", email)
        .orderBy("timestamp", "desc")
        : page == "discoveryPage" ? firestore
        .collection("contents")
        .where('readers', 'array-contains', email)
        .orderBy("timestamp", "desc") 
        : firestore
        .collection("contents")
        .where('group', '==', email)
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
            .then((contents) => { setContents(contents) });
    }, [])

    return (
        <div className={page}>
            {contents ? contents.map(content => <ContentBlockFactory content={content} />) : <LoadingContentBlocks />}
        </div>
    )

}

export function LoadingContentBlocks() {
    return (
        <>
            <LoadingContentBlock />
            <LoadingContentBlock />
            <LoadingContentBlock />
            <LoadingContentBlock />
            <LoadingContentBlock />
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
    const color = content.type == "answer" ? "medium" : "light";
    return (
        <IonCard color = {color}>
            <QuestionBlock email={content.postedUserID} type={content.type} question={content.questionContent} />
            <IonCardContent >
                {content.type == "answer" ? content.answerContent :
                    <IonNavLink routerDirection="forward" component={() => <QuestionViewPage email={content.postedUserID} type={content.type} question={content.questionContent} questionRef={content.id} />}>
                        <IonButton size="small" color="tertiary">View Question</IonButton>
                    </IonNavLink>
                }
            </IonCardContent>
        </IonCard>

    );
};
interface QuestionBlockProps {
    email: string;
    type: string;
    question: string;
}
export const QuestionBlock: React.FC<QuestionBlockProps> = ({ email, type, question }) => {
    return (
        <IonCardHeader>
            <IonCardTitle>{question}</IonCardTitle>
            <IonCardSubtitle>{email} posted {type} ...</IonCardSubtitle>
        </IonCardHeader>
    )
}

export default ContentBlockPage;
