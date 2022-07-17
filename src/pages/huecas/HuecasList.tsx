import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import HomeContext from '../../context/HomeContext';
import Hueca from './Hueca';
import { removeHueca, saveHueca, searchHueca } from './HuecasApi';


const HuecasList: React.FC = () => {
  const{isChangindDataH,handleChangeDataH,handlePageSatus}:any=useContext(HomeContext);

  const { name } = useParams<{ name: string; }>();
  const [huecas, setHuecas] = useState<Hueca[]>([]);/*inicializacion a un array vacio*/
  const history = useHistory();

  useEffect(() =>{
   // handlePageSatus("huecas");
    search();
    if(isChangindDataH){
    
      handleChangeDataH(false);
      history.push("/admin/huecas123")

    }
  }, [history.location.pathname,isChangindDataH]); /* los [] son componentes como clientes que si reciben modificacion se ejecutan o una sola vez cuando se cargue por 1ra vez */


  const search = async() => {
    let result = await searchHueca();
    setHuecas(result);
  }
  const refresh=()=>{
    console.log("ya cambia dentro y refresca")
    handleChangeDataH(true);
  }

  const remove = (id:String) => {
    removeHueca(id,refresh);
    search();
  }

  const addHueca = () =>{
    history.push('/admin/huecas/new');
  }
  const editHueca = (id: string) =>{
    history.push('/admin/huecas/' + id);
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
            <IonTitle> Gestión de huecas turísticos</IonTitle>
            <IonItem>
                <IonButton onClick={addHueca} color="primary" fill="solid" slot='end' size="default">
                    <IonIcon icon={add} />
                    Agregar nueva Hueca
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
            {huecas.map((hueca: Hueca) =>
                <IonRow>
                    <IonCol>{hueca.nombre}</IonCol>
                    <IonCol>{hueca.ubicacion}</IonCol>
                    <IonCol>{hueca.servicios}</IonCol>
                    <IonCol>{hueca.costo}</IonCol>
                    <IonCol>{hueca.horarios}</IonCol>
                    <IonCol>{hueca.telefono}</IonCol>
                    <IonCol>
                        <IonButton onClick={() => editHueca(String(hueca.id))} color="primary" fill="clear">
                            <IonIcon icon={pencil} slot="icon-only"/>
                        </IonButton>
                        <IonButton color="danger" fill="clear"
                        onClick={()=> remove(String(hueca.id))}>
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

export default HuecasList;
