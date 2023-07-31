import { useEffect, useState } from 'react';
import { auth, firestore } from '../main';
import { Users } from '../TableTypes';
import { IonBackButton, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList, IonToast, IonToolbar } from '@ionic/react';
import firebase from 'firebase/compat/app';
import ContentBlockPage from '../components/ContentBlockFactory';

interface GroupPageProps {
    id: string;
}

const GroupPage: React.FC<GroupPageProps> = ({ id }) => {
    const [group, setGroup] = useState<Users>();
    const [isMember, setIsMember] = useState<boolean>();
    const [openJoinedToast, setJoinedToast] = useState<boolean>(false);
    const [openLeaveToast, setLeaveToast] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const { email } = auth?.currentUser;
    useEffect(() => {
        updateUser();
        setIsMember(group && group.groupMembers.includes(email));
    }, []);

    const updateUser = () => {
        firestore
            .collection("users")
            .doc(id)
            .get()
            .then((snap) => {
                return { ...snap.data() };
            })
            .then((user: any | Users) => {
                if (user) {
                    setGroup(user);
                }
            })
    }

    const joinGroup = () => {
        setDisableButton(true);
        firestore
            .collection("users")
            .doc(id).update({
                groupMembers: firebase.firestore.FieldValue.arrayUnion(email),
                groupMemberCount: firebase.firestore.FieldValue.increment(1)
            })
            .then(() =>
                firestore.collection("users").doc(email).update({
                    followings: firebase.firestore.FieldValue.arrayUnion(id),
                    followingsCount: firebase.firestore.FieldValue.increment(1)
                })).then(() => {
                    setIsMember(true);
                    updateUser();
                    setJoinedToast(true);
                    setDisableButton(false);
                })
    }

    const leaveGroup = () => {
        setDisableButton(true);
        firestore
            .collection("users")
            .doc(id).update({
                groupMembers: firebase.firestore.FieldValue.arrayRemove(email),
                groupMemberCount: firebase.firestore.FieldValue.increment(-1)
            })
            .then(() =>
                firestore.collection("users").doc(email).update({
                    followings: firebase.firestore.FieldValue.arrayRemove(id),
                    followingsCount: firebase.firestore.FieldValue.increment(-1)
                })).then(() => {
                    setIsMember(false);
                    updateUser();
                    setLeaveToast(true);
                    setDisableButton(false);
                })
    }
    return (
        <>
            <IonCard className="backButton">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="userSearchPage">Back</IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonCard>
            <div className="profile">
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>{id}</IonCardTitle>
                        <IonCardSubtitle>{group?.groupDescrp}</IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonList>
                            <IonItem>
                                <IonLabel>Members</IonLabel>
                                <IonBadge color="primary">{group ? group.groupMemberCount : "Loading"}</IonBadge>
                            </IonItem>
                            <IonItem>
                                { isMember ?
                                    <IonButton onClick={leaveGroup} disabled={disableButton}>Leave</IonButton>
                                    : <IonButton disabled={disableButton} onClick={joinGroup}>Join</IonButton>}
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>
                {isMember ? <ContentBlockPage lastVisible={null} email={id} page= "groupPage" /> : <></>}
            </div>

            <IonToast
                isOpen={openJoinedToast} color="success"
                message="You are joined to the group"
                onDidDismiss={() => setJoinedToast(false)}
                duration={2000}
            ></IonToast>
            <IonToast
                isOpen={openLeaveToast}
                message="You left the group" color="warning"
                onDidDismiss={() => setLeaveToast(false)}
                duration={2000}
            ></IonToast>
        </>
    );
}

export default GroupPage;