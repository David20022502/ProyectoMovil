import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import HomeContext from '../../context/HomeContext';
import Lugar from './Lugar';
import { removeLugar, saveLugar, searchLugar } from './lugaresApi';


const LugaresList: React.FC= () => {

  const{isChangindData,handleChangeData,handlePageSatus}:any=useContext(HomeContext);
  const { name } = useParams<{ name: string; }>();
  const [lugares, setLugares] = useState<any>([]);/*inicializacion a un array vacio*/
  const history = useHistory();
 
  useEffect(() =>{
    //handlePageSatus("lugares");
     search();
    if(isChangindData){
     
      handleChangeData(false);
    }
    history.replace("/admin")
    console.log("datos trayendo");
  }, [history.location.pathname,isChangindData]); /* los [] son componentes como clientes que si reciben modificacion se ejecutan o una sola vez cuando se cargue por 1ra vez */


  const search = async () => {
    let result = await searchLugar();
    console.log("datos trayendo yaaa",result);
    setLugares(result);
  }
  const refresh=()=>{
    handleChangeData(true);
  }
  const remove = (id:String) => {
    removeLugar(id,refresh);
    search();
  }

  const addLugar = () =>{
    history.push('/admin/lugares/new');
  }
  const editLugar = (id: string) =>{
    history.push('/admin/lugares/' + id);
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
            <IonTitle> Gestión de lugares turísticos</IonTitle>
            <IonItem>
                <IonButton onClick={addLugar} color="primary" fill="solid" slot='end' size="default">
                    <IonIcon icon={add} />
                    Agregar nuevo sitio
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
            {lugares.map((lugar:Lugar) =>
                <IonRow>
                    <IonCol>{lugar.nombre}</IonCol>
                    <IonCol>{lugar.ubicacion}</IonCol>
                    <IonCol>{lugar.servicios}</IonCol>
                    <IonCol>{lugar.costo}</IonCol>
                    <IonCol>{lugar.latitud}</IonCol>
                    <IonCol>{lugar.longitud}</IonCol>
                    <IonCol>
                        <IonButton onClick={() => editLugar(String(lugar.id))} color="primary" fill="clear">
                            <IonIcon icon={pencil} slot="icon-only"/>
                        </IonButton>
                        <IonButton color="danger" fill="clear"
                        onClick={()=> remove(String(lugar.id))}>
                            <IonIcon icon={close} slot="icon-only"/>
                        </IonButton>
                    </IonCol>
                </IonRow>             
            )}
            
        </IonGrid>
        </IonCard>

        <IonList>
          {lugares.map((aver: Lugar) => (
            <IonItem onClick={() => abrirMapa(String(aver.latitud), String(aver.longitud))
            }>
              <IonThumbnail slot="start">
                <IonImg  src='https://img.goraymi.com/2019/03/13/c29fba1d7d275ccfbafdd152d8c835cf_lg.jpg' />
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

export default LugaresList;
