import { IonAccordion, IonAccordionGroup, IonButton, IonItem, IonLabel, IonSpinner, IonTextarea } from "@ionic/react"
import firebase from "firebase/compat/app";
import { auth, firestore } from "../main";
import { useEffect, useRef, useState } from "react";

interface CreateGroupModalProps {
    modal: any;
}
const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ modal }) => {
    const [groupName, setGroupName] = useState('');
    const [groupDescrp, setGroupDescrp] = useState('');
    const [groupList, setGroupList] = useState([]);
    const [selectedGroup, setGroup] = useState('');
    const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);
    useEffect(
        () => {
            const { email } = auth?.currentUser;
            if (email) {
                firestore.collection('users').doc(email).get().then(snap => setGroupList(snap.data()?.followings))
            }
        }, [])

    const sendMessage = async (e) => {
        e.preventDefault();
        //Todo: stretch-goal: find if group Name is already existed.
        firestore.collection('users').doc(groupName).set(
            {
                type: "group",
                groupDescrp: groupDescrp,
                groupName: groupName,
                groupMemberCount: 0,
                groupMembers: [],
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }
        );
        setGroupName('');
        setGroupDescrp('');
        modal.current?.dismiss()
    }

    const selectGroup = (group : string) => {
        setGroup(group);
        if (accordionGroup.current) {
            accordionGroup.current.value = undefined;
        }
    }

    return (
        <>
            <form onSubmit={sendMessage}>
                <IonTextarea label="Create your group name" placeholder="Enter your the group name you want to create"
                    value={groupName} onIonInput={(e) => setGroupName((e.target as HTMLTextAreaElement).value)}
                    labelPlacement="floating" counter={true} maxlength={25} />
                <IonTextarea label="Write the description about your group" placeholder="Explain the group you want to create"
                    value={groupDescrp} onIonInput={(e) => setGroupDescrp((e.target as HTMLTextAreaElement).value)} labelPlacement="floating"
                    counter={true} maxlength={250} autoGrow={true} />
                <IonAccordionGroup expand="inset"  ref={accordionGroup}>
                    <IonAccordion value="first">
                        <IonItem slot="header" color="light">
                            <IonLabel>{selectedGroup ? selectedGroup : "Select the group"}</IonLabel>
                        </IonItem>
                        { groupList ? 
                        <div className="ion-padding" slot="content">
                            {groupList.map(group => <IonItem button onClick={() => selectGroup(group)}>{group}</IonItem>)}
                        </div>
                        : <IonSpinner name="dots"></IonSpinner>
                        }
                    </IonAccordion>
                </IonAccordionGroup>
                <IonButton slot="bottom" type="submit"> Create </IonButton>
            </form>
        </>
    )
}

export default CreateGroupModal;