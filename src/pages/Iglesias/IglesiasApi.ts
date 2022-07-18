import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db_Firestore } from "../../services/FirebaseConect";
import Iglesia from "./Iglesia";

export async function searchIglesia(){
    const albumRef = collection(
        db_Firestore,
         "/iglesias"
       );
       const querySnapshot = await getDocs(albumRef);
       let tempAlbumes:any = [];
 
       querySnapshot.forEach((doc) => {
         let item=doc.data();
         tempAlbumes.push(item);
         
       });
       return tempAlbumes;
    
    /*if(!localStorage['iglesias']){
        localStorage['iglesias'] = '[]';
    }
    let iglesias = localStorage['iglesias'];
    iglesias = JSON.parse(iglesias);
    return iglesias;*/
}

export async function removeIglesia(id: String,refresh:any){
    let iglesias = await searchIglesia();
    let indice = iglesias.filter((lugar:any) => lugar.id == id);
    console.log("encontrado",indice)
    await deleteDoc(doc(db_Firestore, "iglesias", indice[0].idDoc));
    if(refresh){
        refresh();
    }
   /* let indice = iglesias.findIndex((iglesia:Iglesia) => iglesia.id == id);
    iglesias.splice(indice, 1);
    localStorage['iglesias'] = JSON.stringify(iglesias);*/
    
}

export async function saveIglesia(iglesia:any,refresh:any){
    let iglesias = await searchIglesia();
    if(iglesia.id){
        let indice = iglesias.findIndex((c:Iglesia) => c.id == iglesia.id);
        //iglesias[indice] = iglesia;
        const washingtonRef = doc(db_Firestore, "iglesias", iglesia.idDoc);
        await updateDoc(washingtonRef, iglesia);
    }else{
        iglesia.id = String(Math.round(Math.random() *100000));
        iglesias.push(iglesia);
        const docRef = await addDoc(collection(db_Firestore, "iglesias"), iglesia);
        const washingtonRef = doc(db_Firestore, "iglesias", docRef.id);
        console.log("Document written with ID: ", docRef.id);
        await updateDoc(washingtonRef, {
            idDoc: docRef.id
          });
    }
    
    //localStorage['iglesias'] = JSON.stringify(iglesias);
    if(refresh){
        console.log("refrescando pagina de iglesia")
        refresh();
    }
}

export async function searchIglesiaById(id: string){
    let iglesias = await searchIglesia();
    return iglesias.find((iglesia:any) => iglesia.id == id);    
}