import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil, refresh } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import HomeContext from '../../context/HomeContext';
import Iglesia from './Iglesia';
import { removeIglesia, saveIglesia, searchIglesia } from './IglesiasApi';


const IglesiasList: React.FC = () => {
  const{isChangindDataH,handleChangeDataH,handlePageSatus}:any=useContext(HomeContext);

  const { name } = useParams<{ name: string; }>();
  const [iglesias, setIglesias] = useState<Iglesia[]>([]);
  const history = useHistory();

  useEffect(() =>{
    // handlePageSatus("iglesias");
     search();
     if(isChangindDataH){
     
       handleChangeDataH(false);
       history.push("/admin/iglesias123")
 
     }
   }, [history.location.pathname,isChangindDataH]); /* los [] son componentes como clientes que si reciben modificacion se ejecutan o una sola vez cuando se cargue por 1ra vez */


  const search = async () => {
    let result = await searchIglesia();
    setIglesias(result);
  }

  const refresh=()=>{
    console.log("ya cambia dentro y refresca")
    handleChangeDataH(true);
  }

  const remove = (id:String) => {
    removeIglesia(id, refresh);
    search();
  }

  const addIglesia = () =>{
    history.push('/admin/iglesias/new');
  }
  const editIglesia = (id: string) =>{
    history.push('/admin/iglesias/' + id);
  }

  const abrirMapa=(latitud: string, longitud: string)=>{
    window.open('https://www.openstreetmap.org/#map=14/'+latitud+'/'+longitud);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
            
          </IonToolbar>
        </IonHeader>

    <IonContent>
        <IonCard>
            <IonTitle> Gestión de iglesias </IonTitle>
            <IonItem>
                <IonButton onClick={addIglesia} color="primary" fill="solid" slot='end' size="default">
                    <IonIcon icon={add} />
                    Agregar nueva Iglesia
                </IonButton>
            </IonItem>
        <IonGrid className='table'>
            <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Ubicación</IonCol>
                <IonCol>Servicios</IonCol>
                <IonCol>Costo</IonCol>
                <IonCol>Latitud</IonCol>
                <IonCol>Longitud</IonCol>
                <IonCol>Acciones</IonCol>
            </IonRow>
            {iglesias.map((iglesia: Iglesia) =>
                <IonRow>
                    <IonCol>{iglesia.nombre}</IonCol>
                    <IonCol>{iglesia.ubicacion}</IonCol>
                    <IonCol>{iglesia.servicios}</IonCol>
                    <IonCol>{iglesia.costo}</IonCol>
                    <IonCol>{iglesia.latitud}</IonCol>
                    <IonCol>{iglesia.longitud}</IonCol>
                    <IonCol>
                        <IonButton onClick={() => editIglesia(String(iglesia.id))} color="primary" fill="clear">
                            <IonIcon icon={pencil} slot="icon-only"/>
                        </IonButton>
                        <IonButton color="danger" fill="clear"
                        onClick={()=> remove(String(iglesia.id))}>
                            <IonIcon icon={close} slot="icon-only"/>
                        </IonButton>
                    </IonCol>
                </IonRow>            
            )}
            
        </IonGrid>
        </IonCard>

        <IonList>
          {iglesias.map((aver: Iglesia) => (
            <IonItem onClick={() => abrirMapa(String(aver.latitud), String(aver.longitud))
            }>
              <IonThumbnail slot="start">
                <IonImg  src='https://imagenes.elpais.com/resizer/f_s9G1Ytn6P0nAKVPwjNQIa59n8=/414x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/NGN3CK525VB43IXLKOP2TQTSMA.jpg' />
              </IonThumbnail>
              <IonLabel>{aver.nombre} Ubicado en: {aver.ubicacion}</IonLabel>
              <IonLabel>Mapa</IonLabel>
            </IonItem>
            ))}
        </IonList> 

    </IonContent>





        
      </IonContent>
    </IonPage>
  );
};

export default IglesiasList;
