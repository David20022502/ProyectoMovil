import { IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonPage, IonRouterLink, IonRow, IonSelect, IonSelectOption, IonToolbar } from '@ionic/react';
import styles from './Signup.module.scss';

import { arrowBack, shapesOutline } from "ionicons/icons";
import CustomField from '../components/CustomField';
import { useSignupFields } from '../data/Fields';
import { Action } from '../components/Action';
import { Wave } from '../components/Wave';
import { useContext, useEffect, useState } from 'react';
import { validateForm } from '../data/Utils';
import { useHistory, useParams } from 'react-router';
import HomeContext from '../context/HomeContext';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getMessage } from '../services/Messages';
import { createUserDatabases } from '../services/ServicesFirebase';

const Signup = () => {
    const { handleLoading, handleError }: any = useContext(HomeContext);
    const params = useParams();
    const fields = useSignupFields();
    const [errors, setErrors] = useState(false);
    const [logs, setLogs] = useState<any>(null);
const history=useHistory();
   
    useEffect(() => {

        return () => {

            fields.forEach(field => field.input.state.reset(""));
            setErrors(false);
        }
    }, [params]);
    useEffect(() => {
       console.log("logs---",logs)
    }, [logs]);
    
    const createAccount = () => {

        const errors = validateForm(fields);
        setErrors(errors);

        if (!errors.length&&logs) {
            const values = {
                userName: fields[2].input.state.value,
                password: fields[3].input.state.value
            }
            registerFunction(values);
            console.log("data", fields)
            //  Submit your form here
        }else{
            if(!logs){
                handleError(getMessage("role_required"), "red");
            }
        }
    }
    const pushLog = (msg:any) => {
        setLogs(msg);
      };
    const handlePage=()=>{
        history.push("/login")
    }
    const registerFunction = (values: any) => {
        const auth = getAuth();
        handleLoading(true);
        createUserWithEmailAndPassword(auth, values.userName, values.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("usuario creado", user);
                console.log("usuario creado credenciales", userCredential);
                let userTemp = {
                    id: user.uid,
                    email: values.userName,
                    names: fields[0].input.state.value,
                    lastName: fields[1].input.state.value,
                    role: logs,
                }
                createUserDatabases(userTemp,handlePage);
                // ...
                handleLoading(false);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("errorCode", errorCode);
                console.log("errorMessage", errorMessage);
                handleLoading(false);
                handleError(getMessage(error.code), "red");
                console.log("error al inciar sesion", error)
                const data = getMessage("notAutenticated");
                console.log("mensaje obtenido", data)
            });
    }
    return (
        <IonPage className={styles.signupPage}>
            
            <IonContent fullscreen>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol size="12" className={styles.headingText}>
                            <IonCardTitle>Sign up</IonCardTitle>
                            <h5>Lets get to know each other</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">

                            {fields.map(field => {

                                return <CustomField field={field} errors={errors} />;
                            })}
                            <IonList>
                                <IonItem>
                                    <IonSelect
                                        placeholder="Select fruit"
                                        onIonChange={(e:any) => pushLog(e.detail.value)}

                                    >
                                        <IonSelectOption value="ADMIN">Administrador</IonSelectOption>
                                        <IonSelectOption value="TURIST">Turista</IonSelectOption>
                                        <IonSelectOption value="OWNER">Propietario</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonList>
                            <IonButton className="custom-button" expand="block" onClick={createAccount}>Create account</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>

            <IonFooter>
                <IonGrid className="ion-no-margin ion-no-padding">

                    <Action message="Already got an account?" text="Login" link="/login" />
                    <Wave />
                </IonGrid>
            </IonFooter>
        </IonPage>
    );
};

export default Signup;