import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, checkmark, close, pencil, text } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import HomeContext from '../../context/HomeContext';
import { removeLugar, saveLugar, searchLugar, searchLugarById } from './lugaresApi';


const LugaresEdit: React.FC = () => {
  const{isChangindData,handleChangeData}:any=useContext(HomeContext);

  const { name, id } = useParams<{ name: string; id: string }>();
  const [lugar, setLugar] = useState<any>({});/*inicializacion a un array vacio*/
  const history = useHistory();


  useEffect(() =>{
    search();
    console.log("esta en -- ",isChangindData)

    if(isChangindData){
    console.log("esta en verdadero ",isChangindData)
      handleChangeData(false);
    }
  }, [isChangindData]); /* los [] son componentes como clientes que si reciben modificacion se ejecutan o una sola vez cuando se cargue por 1ra vez */


  const search = async () => {
    if(id !== 'new'){
        let result = await searchLugarById(id);
        setLugar(result);
    }
  }
  const refresh=()=>{
    handleChangeData(true);
  }
  const save = () => {
    saveLugar(lugar,refresh);
    history.replace('/admin/lugares')
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
            <IonTitle>{id === 'new' ? 'Agregar Sitio Turistico' : 'Editar Datos'}</IonTitle>
            <IonRow>
                <IonCol>                       
                    <IonItem>
                        <IonLabel position="stacked">Nombre</IonLabel>
                        <IonInput onIonChange={e => lugar.nombre = e.detail.value} 
                            value={lugar.nombre}> </IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Ubicación</IonLabel>
                        <IonInput onIonChange={e => lugar.ubicacion = e.detail.value} 
                            value={lugar.ubicacion}> </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Servicios</IonLabel>
                        <IonInput onIonChange={e => lugar.servicios = e.detail.value} 
                            value={lugar.servicios}> </IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Costo</IonLabel>
                        <IonInput onIonChange={e => lugar.costo = e.detail.value} 
                            value={lugar.costo}> </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Horarios</IonLabel>
                        <IonInput onIonChange={e => lugar.horarios = e.detail.value} 
                            value={lugar.horarios}> </IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Telefono</IonLabel>
                        <IonInput onIonChange={e => lugar.telefono = e.detail.value} 
                            value={lugar.telefono}> </IonInput>
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

export default LugaresEdit;
