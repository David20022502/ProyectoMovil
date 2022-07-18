import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, checkmark, close, pencil, text } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import HomeContext from '../../context/HomeContext';
import Iglesia from './Iglesia';
import { removeIglesia, saveIglesia, searchIglesia, searchIglesiaById } from './IglesiasApi';


const IglesiasEdit: React.FC = () => {
  const{isChangindDataH,handleChangeDataH}:any=useContext(HomeContext);

  const { name, id } = useParams<{ name: string; id: string }>();
  const [iglesia, setIglesia] = useState<Iglesia>({});/*inicializacion a un array vacio*/
  const history = useHistory();


  useEffect(() =>{
    search();
    console.log("para ver cambia isChangindData",isChangindDataH)
    if(isChangindDataH){
      handleChangeDataH(false);
    }
  }, [isChangindDataH]); /* los [] son componentes como clientes que si reciben modificacion se ejecutan o una sola vez cuando se cargue por 1ra vez */


  const search = async () => {
    if(id !== 'new'){
        let result = await searchIglesiaById(id);
        setIglesia(result);
    }
  }
  const refresh=()=>{
    console.log("ya cambia dentro y refresca")

    handleChangeDataH(true);
  }

  const save = () => {
    saveIglesia(iglesia, refresh);
    history.push('/admin/iglesias')
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
            <IonTitle>{id === 'new' ? 'Agregar Nueva Iglesia' : 'Editar Datos'}</IonTitle>
            <IonRow>
                <IonCol>                       
                    <IonItem>
                        <IonLabel position="stacked">Nombre</IonLabel>
                        <IonInput onIonChange={e => iglesia.nombre = String(e.detail.value)} 
                            value={iglesia.nombre}> </IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Ubicación</IonLabel>
                        <IonInput onIonChange={e => iglesia.ubicacion = String(e.detail.value)} 
                            value={iglesia.ubicacion}> </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Servicios</IonLabel>
                        <IonInput onIonChange={e => iglesia.servicios = String(e.detail.value)} 
                            value={iglesia.servicios}> </IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Costo</IonLabel>
                        <IonInput onIonChange={e => iglesia.costo = String(e.detail.value)} 
                            value={iglesia.costo}> </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Latitud</IonLabel>
                        <IonInput onIonChange={e => iglesia.latitud = String(e.detail.value)} 
                            value={iglesia.latitud}> </IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Longitud</IonLabel>
                        <IonInput onIonChange={e => iglesia.longitud = String(e.detail.value)} 
                            value={iglesia.longitud}> </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            
            
            
            
            
            
            
            <IonItem>
                <IonButton onClick={save} color="success" fill="solid" slot='end' size="default">
                    <IonIcon icon={checkmark} />
                    Guardar
                </IonButton>
            </IonItem>
        


        </IonCard>

    </IonContent>





        
      </IonContent>
    </IonPage>
  );
};

export default IglesiasEdit;
