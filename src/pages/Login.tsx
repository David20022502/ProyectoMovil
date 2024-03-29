import { IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonToolbar } from '@ionic/react';
import styles from './Login.module.scss';

import { arrowBack, shapesOutline } from "ionicons/icons";
import CustomField from '../components/CustomField';
import { useLoginFields } from '../data/Fields';
import { Action } from '../components/Action';
import { Wave } from '../components/Wave';
import { useContext, useEffect, useState } from 'react';
import { validateForm } from '../data/Utils';
import { useHistory, useParams } from 'react-router';
import HomeContext from '../context/HomeContext';

const Login = () => {
    const { singInWithEmailPassword }: any = useContext(HomeContext);
    const history = useHistory();
   
    const params = useParams();

    const fields = useLoginFields();
    const [ errors, setErrors ] = useState(false);

    const login = () => {

        const errors = validateForm(fields);
        setErrors(errors);

        if (!errors.length) {
            const user={
                email:fields[0].input.state.value,
                password:fields[1].input.state.value,
            }
            singInWithEmailPassword(user);
        }
    }

    useEffect(() => {

        return () => {

            fields.forEach(field => field.input.state.reset(""));
            setErrors(false);
        }
    }, [params]);

	return (
		<IonPage className={ styles.loginPage }>
			<IonHeader>
				<IonToolbar>
					
                    <IonButtons slot="start">
                        <IonBackButton icon={ arrowBack } text="" className="custom-back" />
                    </IonButtons>

                    <IonButtons slot="end">
                        <IonButton className="custom-button">
                            <IonIcon icon={ shapesOutline } />
                        </IonButton>
                    </IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol size="12" className={ styles.headingText }>
                            <IonCardTitle>Log in</IonCardTitle>
                            <h5>Welcome back, hope you're doing well</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">

                            { fields.map(field => {

                                return <CustomField field={ field } errors={ errors } />;
                            })}

                            <IonButton className="custom-button" expand="block" onClick={ login }>Login</IonButton>
               
                        </IonCol>
                        
                    </IonRow>
                </IonGrid>
			</IonContent>

			<IonFooter>
				<IonGrid className="ion-no-margin ion-no-padding">

                    <Action message="Don't have an account?" text="Sign up" link="/signup" />
                   
				</IonGrid>
			</IonFooter>
		</IonPage>
	);
};

export default Login;