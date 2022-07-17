import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db_Firestore } from "../../services/FirebaseConect";
import Hueca from "./Hueca";

export async function searchHueca(){
    const albumRef = collection(
        db_Firestore,
         "/huecas"
       );
       const querySnapshot = await getDocs(albumRef);
       let tempAlbumes:any = [];
 
       querySnapshot.forEach((doc) => {
         let item=doc.data();
         tempAlbumes.push(item);
         
       });
       return tempAlbumes;
    
    /*if(!localStorage['huecas']){
        localStorage['huecas'] = '[]';
    }
    let huecas = localStorage['huecas'];
    huecas = JSON.parse(huecas);
    return huecas;*/
}

export async function removeHueca(id: String,refresh:any){
    let huecas = await searchHueca();
    let indice = huecas.filter((lugar:any) => lugar.id == id);
    console.log("encontrado",indice)
    await deleteDoc(doc(db_Firestore, "huecas", indice[0].idDoc));
    if(refresh){
        refresh();
    }
   /* let indice = huecas.findIndex((hueca:Hueca) => hueca.id == id);
    huecas.splice(indice, 1);
    localStorage['huecas'] = JSON.stringify(huecas);*/
    
}

export async function saveHueca(hueca:any,refresh:any){
    let huecas = await searchHueca();
    if(hueca.id){
        let indice = huecas.findIndex((c:Hueca) => c.id == hueca.id);
        //huecas[indice] = hueca;
        const washingtonRef = doc(db_Firestore, "huecas", hueca.idDoc);
        await updateDoc(washingtonRef, hueca);
    }else{
        hueca.id = String(Math.round(Math.random() *100000));
        huecas.push(hueca);
        const docRef = await addDoc(collection(db_Firestore, "huecas"), hueca);
        const washingtonRef = doc(db_Firestore, "huecas", docRef.id);
        console.log("Document written with ID: ", docRef.id);
        await updateDoc(washingtonRef, {
            idDoc: docRef.id
          });
    }
    
    //localStorage['huecas'] = JSON.stringify(huecas);
    if(refresh){
        console.log("refrescando pagina de hueca")
        refresh();
    }
}

export async function searchHuecaById(id: string){
    let huecas = await searchHueca();
    return huecas.find((hueca:any) => hueca.id == id);    
}