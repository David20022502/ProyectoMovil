import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import Iglesia from './Iglesia';
import { removeIglesia, saveIglesia, searchIglesia } from './IglesiasApi';


const IglesiasList: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [iglesias, setIglesias] = useState<Iglesia[]>([]);/*inicializacion a un array vacio*/
  const history = useHistory();

  useEffect(() =>{
    search();
  }, [history.location.pathname]); /* los [] son componentes como clientes que si reciben modificacion se ejecutan o una sola vez cuando se cargue por 1ra vez */


  const search = () => {
    let result = searchIglesia();
    setIglesias(result);
  }

  const remove = (id:String) => {
    removeIglesia(id);
    search();
  }

  const addIglesia = () =>{
    history.push('/page/iglesias/new');
  }
  const editIglesia = (id: string) =>{
    history.push('/page/iglesias/' + id);
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
            <IonTitle> Gestión de iglesias turísticos</IonTitle>
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
                <IonCol>Costo de entrada</IonCol>
                <IonCol>Horarios</IonCol>
                <IonCol>Telefono</IonCol>
                <IonCol>Acciones</IonCol>
            </IonRow>
            {iglesias.map((iglesia: Iglesia) =>
                <IonRow>
                    <IonCol>{iglesia.nombre}</IonCol>
                    <IonCol>{iglesia.ubicacion}</IonCol>
                    <IonCol>{iglesia.servicios}</IonCol>
                    <IonCol>{iglesia.costo}</IonCol>
                    <IonCol>{iglesia.horarios}</IonCol>
                    <IonCol>{iglesia.telefono}</IonCol>
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

    </IonContent>





        
      </IonContent>
    </IonPage>
  );
};

export default IglesiasList;
