import { IonButton, IonModal, IonTextarea } from "@ionic/react"
import firebase from "firebase/compat/app";
import { firestore } from "../main";
import { useState } from "react";

interface CreateGroupModalProps {
    modal: any;
}
const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ modal }) => {
    const [groupName, setGroupName] = useState('');
    const [groupDescrp, setGroupDescrp] = useState('');
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

    return (
        <>
            <form onSubmit={sendMessage}>
                <IonTextarea label="Create your group name" placeholder="Enter your the group name you want to create" value={groupName} onIonInput={(e) => setGroupName((e.target as HTMLTextAreaElement).value)} labelPlacement="floating" counter={true} maxlength={25} />
                <IonTextarea label="Write the description about your group" placeholder="Explain the group you want to create" value={groupDescrp} onIonInput={(e) => setGroupDescrp((e.target as HTMLTextAreaElement).value)} labelPlacement="floating" counter={true} maxlength={250} autoGrow={true} />
                <IonButton slot="bottom" type="submit"> Create </IonButton>
            </form>
        </>
    )
}

export default CreateGroupModal;