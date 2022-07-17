import Iglesia from "./Iglesia";

export function searchIglesia(){
    if(!localStorage['iglesias']){
        localStorage['iglesias'] = '[]';
    }
    let iglesias = localStorage['iglesias'];
    iglesias = JSON.parse(iglesias);
    return iglesias;
}

export function removeIglesia(id: String){
    let iglesias = searchIglesia();

    let indice = iglesias.findIndex((iglesia:Iglesia) => iglesia.id == id);
    iglesias.splice(indice, 1);
    localStorage['iglesias'] = JSON.stringify(iglesias);
    
}

export function saveIglesia(iglesia:Iglesia){
    let iglesias = searchIglesia();
    if(iglesia.id){
        let indice = iglesias.findIndex((c:Iglesia) => c.id == iglesia.id);
        iglesias[indice] = iglesia;
    }else{
        iglesia.id = String(Math.round(Math.random() *100000));
        iglesias.push(iglesia);
    }
    
    localStorage['iglesias'] = JSON.stringify(iglesias);
    
}

export function searchIglesiaById(id: string){
    let iglesias = searchIglesia();
    return iglesias.find((iglesia:any) => iglesia.id == id);    
}