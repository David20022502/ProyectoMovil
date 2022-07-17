import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db_Firestore } from "../../services/FirebaseConect";

export async function searchLugar(){

    const albumRef = collection(
       db_Firestore,
        "/lugaresTuristicos"
      );
      const querySnapshot = await getDocs(albumRef);
      let tempAlbumes:any = [];

      querySnapshot.forEach((doc) => {
        let item=doc.data();
        tempAlbumes.push(item);
        
      });
      return tempAlbumes;
    /*if(!localStorage['lugares']){
        localStorage['lugares'] = '[]';
    }
    let lugares = localStorage['lugares'];
    lugares = JSON.parse(lugares);
    return lugares;*/
}

export async function removeLugar(id: String,refresh:any){
    let lugares = await searchLugar();

    let indice = lugares.filter((lugar:any) => lugar.id == id);
    console.log("encontrado",indice)
    await deleteDoc(doc(db_Firestore, "lugaresTuristicos", indice[0].idDoc));
    if(refresh){
        refresh();
    }
    //lugares.splice(indice, 1);
    //localStorage['lugares'] = JSON.stringify(lugares);
    
}

export async function saveLugar (lugar:any,refresh:any){

   console.log("lugar",lugar);

    let lugares :any= await searchLugar();
    console.log("lugares",lugares)
    if(lugar.id){
        let indice = lugares.findIndex((c:any) => c.id == lugar.id);
       const washingtonRef = doc(db_Firestore, "lugaresTuristicos", lugar.idDoc);
       await updateDoc(washingtonRef, lugar);
    }else{
        lugar.id = Math.round(Math.random() *100000);
        console.log("lugares con json",JSON.stringify(lugares))
        const docRef = await addDoc(collection(db_Firestore, "lugaresTuristicos"), lugar);
        const washingtonRef = doc(db_Firestore, "lugaresTuristicos", docRef.id);
        console.log("Document written with ID: ", docRef.id);
        await updateDoc(washingtonRef, {
            idDoc: docRef.id
          });
    }

    let indice = lugares.filter((c:any) => c.id == lugar.id);
    console.log("encontrado para eliminar",indice);
   
    if(refresh){
        refresh();
    }
   
    
}

export async function searchLugarById(id: string){
    let lugares:any = await searchLugar();
    return lugares.find((lugar:any) => lugar.id == id);    
}