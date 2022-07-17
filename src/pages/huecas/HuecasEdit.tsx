import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, checkmark, close, pencil, text } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import HomeContext from '../../context/HomeContext';
import Hueca from './Hueca';
import { removeHueca, saveHueca, searchHueca, searchHuecaById } from './HuecasApi';


const HuecasEdit: React.FC = () => {
  const{isChangindDataH,handleChangeDataH}:any=useContext(HomeContext);

  const { name, id } = useParams<{ name: string; id: string }>();
  const [hueca, setHueca] = useState<Hueca>({});/*inicializacion a un array vacio*/
  const history = useHistory();


  useEffect(() =>{
    search();
    console.log("para ver cambia isChangindData",isChangindDataH)
    if(isChangindDataH){
      handleChangeDataH(false);
    }
  }, [isChangindDataH]); /* los [] son componentes como clientes que si reciben modificacion se ejecutan o una sola vez cuando se cargue por 1ra vez */


  const  search = async() => {
    if(id !== 'new'){
        let result = await searchHuecaById(id);
        setHueca(result);
    }
  }
  const refresh=()=>{
    console.log("ya cambia dentro y refresca")

    handleChangeDataH(true);
  }

  const save = () => {
    saveHueca(hueca,refresh);
    history.replace('/admin/huecas')
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
            <IonTitle>{id === 'new' ? 'Agregar Nueva Hueca' : 'Editar Datos'}</IonTitle>
            <IonRow>
                <IonCol>                       
                    <IonItem>
                        <IonLabel position="stacked">Nombre</IonLabel>
                        <IonInput onIonChange={e => hueca.nombre = String(e.detail.value)} 
                            value={hueca.nombre}> </IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Ubicación</IonLabel>
                        <IonInput onIonChange={e => hueca.ubicacion = String(e.detail.value)} 
                            value={hueca.ubicacion}> </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Servicios</IonLabel>
                        <IonInput onIonChange={e => hueca.servicios = String(e.detail.value)} 
                            value={hueca.servicios}> </IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Costo</IonLabel>
                        <IonInput onIonChange={e => hueca.costo = String(e.detail.value)} 
                            value={hueca.costo}> </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Horarios</IonLabel>
                        <IonInput onIonChange={e => hueca.horarios = String(e.detail.value)} 
                            value={hueca.horarios}> </IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Telefono</IonLabel>
                        <IonInput onIonChange={e => hueca.telefono = String(e.detail.value)} 
                            value={hueca.telefono}> </IonInput>
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

export default HuecasEdit;
