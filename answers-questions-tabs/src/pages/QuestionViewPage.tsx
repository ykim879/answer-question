import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonTextarea, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { QuestionBlock } from '../components/ContentBlockFactory';

interface QuestionViewPageProps {
    email: string;
    type: string;
    question: string;
    questionRef: string;
}
const QuestionViewPage: React.FC<QuestionViewPageProps> = ({ email, type, question }) => {
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
                <AnswerInputCard />
                {/*<AnswerBlocks lastVisible={lastVisible} email={email} />*/}
            </div>

        </IonContent>
    );
}

const AnswerInputCard = () => {
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
                ></IonTextarea>
                <IonButton size="small">Submit</IonButton>
            </IonCardContent>
        </IonCard>
    );
}

export default QuestionViewPage;