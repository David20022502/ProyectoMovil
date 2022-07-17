import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, checkmark, close, pencil, text } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import Iglesia from './Iglesia';
import { removeIglesia, saveIglesia, searchIglesia, searchIglesiaById } from './IglesiasApi';


const IglesiasEdit: React.FC = () => {

  const { name, id } = useParams<{ name: string; id: string }>();
  const [iglesia, setIglesia] = useState<Iglesia>({});/*inicializacion a un array vacio*/
  const history = useHistory();


  useEffect(() =>{
    search();
  }, []); /* los [] son componentes como clientes que si reciben modificacion se ejecutan o una sola vez cuando se cargue por 1ra vez */


  const search = () => {
    if(id !== 'new'){
        let result = searchIglesiaById(id);
        setIglesia(result);
    }
  }

  const save = () => {
    saveIglesia(iglesia);
    history.push('/page/iglesias')
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
                        <IonLabel position="stacked">Horarios</IonLabel>
                        <IonInput onIonChange={e => iglesia.horarios = String(e.detail.value)} 
                            value={iglesia.horarios}> </IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Telefono</IonLabel>
                        <IonInput onIonChange={e => iglesia.telefono = String(e.detail.value)} 
                            value={iglesia.telefono}> </IonInput>
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
