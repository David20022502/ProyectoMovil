import React, { useCallback, useEffect, useReducer, useState } from "react"
import { getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import HomeContext from "./HomeContext"
import { HomeReducer } from "./HomeReducer"
import { getMessage } from "../services/Messages";
import { CHANGING_DATA, CHANGING_DATA_H, CHANGING_PAGE_STATUS, IS_AUTENTICATED, LOADING_END, LOADING_START, LOAD_FIREBASE_USER, LOAD_TAKITRI_USER, UPDATE_USER_ROLE } from "./HomeTypes";
import { db_Firestore } from "../services/FirebaseConect";
import { IonAlert, IonLoading, IonModal } from "@ionic/react";
import { useHistory } from "react-router";

export const HomeStates = ({ children }: any) => {
    const initialValues = {
        userFirebase: null,
        userApp: null,
        isAutenticated: null,
        isLoading: false,
        role:null,
        isChangindData:false,
        isChangindH:false,
        pageStatus:null,
        isChangindI:false,

    }
    const history=useHistory();
    console.log("history123",history)

    const [state, dispatch] = useReducer(HomeReducer, initialValues);
    const [currentMusic, setCurrentMusic] = useState(null);
    const [snackBarPadding, setsNackBarPadding] = useState(0);
    const [currentPlayList, setCurrentPlayList] = useState(null);
    const [isPlayingSoundInside, setIsPlayingSoundInside] = useState(false);
    const [audioPlayer, setAudioPlayer] = useState(null);
    const [isSnackVisible, setIsSnackVisible] = useState(false);
    const [color, setColor] = useState("white");
    const [message, setMessage] = useState(null);
    const [isInformationVisible, setIsInformationVisible] = useState(false);
    const [itemInformation, setItemInformation] = useState(null);
    useEffect(()=>{
        if(state.isAutenticated==true){
            let url = state.userApp.role.toLowerCase();
            history.push("/admin");
        }else if(state.isAutenticated==false){

            history.push('/login');
        }
    },[ state])
    const currentAutenticatedUser = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // @ts-ignore
                dispatch({ type: LOAD_FIREBASE_USER, payload: user })

                handleUserFirebase(user)
            } else {
                handleIsAutenticated(false);
                // User is signed out
                // ...
            }
        });
    }
    const singInWithEmailPassword = useCallback(async (values) => {
        const auth = getAuth();
        handleLoading(true);
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in

                const user = userCredential.user;
                console.log("ligon user", user.uid)
                // @ts-ignore
                dispatch({ type: LOAD_FIREBASE_USER, payload: user })
                handleUserFirebase(user)
                //handleLoading(false);
                // ...
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
    }, [])
    const handleUserFirebase = useCallback(async (user) => {
        //global.user_id = user.uid || user.id;
        const docRef = doc(db_Firestore, "users", user.uid || user.id);
        const docSnap = await getDoc(docRef);
        console.log("usuario firestore", docSnap.data())
        const userData=docSnap.data();
        // @ts-ignore
        dispatch({ type: LOAD_TAKITRI_USER, payload: docSnap.data() })
        handleIsAutenticated(true);
        handleLoading(false);
    }, [])
    const handleError = useCallback((message, color) => {
        setColor(color);
        setMessage(message);
    }, []);
    const handleLoading = useCallback((isLoading) => {
        // @ts-ignore
        dispatch({ type: isLoading ? LOADING_START : LOADING_END });
    }, []);
    const handlePageSatus = useCallback((page) => {
        // @ts-ignore
        dispatch({ type: CHANGING_PAGE_STATUS,payload:page });
    }, []);
    
    const handleChangeData = useCallback((isChange) => {
        console.log("ver data de is changing",isChange)
        dispatch({ type: CHANGING_DATA,payload:isChange });
    }, []);
    const handleChangeDataH = useCallback((isChange) => {
        console.log("ver data de is changing",isChange)
        dispatch({ type: CHANGING_DATA_H,payload:isChange });
    }, []);
    const handleRoleUser = useCallback((role) => {
        // @ts-ignore
        //dispatch({ type:UPDATE_USER_ROLE,payload:role});
    }, []);
    const handleIsAutenticated = useCallback(async (isAutenticated) => {
        dispatch({ type: IS_AUTENTICATED, payload: isAutenticated })
        console.log("seta antenticando",isAutenticated)

    }, [])
    const handleLogOut = useCallback(async () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            let val = {
                "role": "",
                "id": "",
                "lastName": "",
                "names": "",
                "email": "",
            }
            // @ts-ignore
            dispatch({ type: LOAD_TAKITRI_USER, payload: val })
            handleIsAutenticated(false);

        }).catch((error) => {
            console.log("error al salir de la sesion")
        });

    }, [])
    const onDismissSnackBar = () => setMessage(null);

    return <HomeContext.Provider
        value={
            {
                userApp: state.userApp,
                isAutenticated:state.isAutenticated,
                role:state.role,
                isChangindData:state.isChangindData,
                pageStatus:state.pageStatus,
                isChangindDataH:state.isChangindDataH,
                handleChangeDataH,
                handleChangeData,
                handlePageSatus,
                handleLoading,
                handleRoleUser,
                handleError,
                singInWithEmailPassword,
                handleLogOut,
                currentAutenticatedUser,
            }
        }
    >
        {children}
        <IonLoading
            isOpen={state.isLoading}
           
            message={'Cargando..'}
        />

        <IonAlert
        isOpen={message !== null}
        onDidDismiss={() => onDismissSnackBar()}
        header="Alert"
        subHeader="Error"
        message={message||""}
        buttons={['OK']}
      />

    </HomeContext.Provider>
}