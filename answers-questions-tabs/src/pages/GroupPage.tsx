import { useEffect, useState } from 'react';
import { auth, firestore } from '../main';
import { Users } from '../TableTypes';
import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList } from '@ionic/react';

interface GroupPageProps {
    id: string;
}

const GroupPage: React.FC<GroupPageProps> = ({ id }) => {
    const [group, setGroup] = useState<Users>();
    const { email } = auth?.currentUser;
    useEffect(() => {
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
    }, []);

    return (
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
                            {email && group && group.groupMembers && email in group?.groupMembers ?
                                <IonButton>Unfollow</IonButton> : <IonButton>Join</IonButton>}
                        </IonItem>
                    </IonList>
                </IonCardContent>

            </IonCard>
        </div>
    );
}

export default GroupPage;