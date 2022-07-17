import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs,getDoc, query, where, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db_Firestore } from "./FirebaseConect";

export const createUserDatabases=async(user:any,handlePage:any)=>{
  console.log("usuario a almacenar",user);
    await setDoc(doc( db_Firestore,"users",user.id), {
        id:user.id,
        email:user.email,
        names:user.names,
        lastName:user.lastName,
        role:user.role,
      });
      if(handlePage){
        handlePage();
      }
    return 0;
}

