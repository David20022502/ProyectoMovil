import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp, airplane, airplaneOutline, home, homeOutline, homeSharp, pin, pinOutline, paw, pawOutline } from 'ionicons/icons';
import './Menu.css';
import { useContext } from 'react';
import HomeContext from '../context/HomeContext';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Lugares Turisticos',
    url: 'admin/lugares',
    iosIcon: airplaneOutline,
    mdIcon: airplane
  },
  {
    title: 'Huecas',
    url: 'admin/huecas',
    iosIcon: homeOutline,
    mdIcon: home
  },
  {
    title: 'Iglesias',
    url: 'admin/iglesias',
    iosIcon: homeOutline,
    mdIcon: home
  },
  {
    title: 'Parques',
    url: 'admin/parques',
    iosIcon: pinOutline,
    mdIcon: pin
  },
  {
    title: 'Zoologicos',
    url: 'admin/zoologicos',
    iosIcon: pawOutline,
    mdIcon: paw
  },
  {
    title: 'Otros',
    url: 'admin/otros',
    iosIcon: warningOutline,
    mdIcon: warningSharp
  }

];

const labels = ['add'];

const Menu: React.FC = () => {
  const location = useLocation();
  const { handleLogOut,userApp }: any = useContext(HomeContext)


  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{userApp.role.toLowerCase()}</IonListHeader>
          <IonNote>{userApp.names}</IonNote>
          {appPages.map((appPage, index) => {
            console.log("appPage123",appPage)
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonMenuToggle key={50} autoHide={false}>
            <IonButton
            onClick={()=> {handleLogOut(); }}
            >
              Cerrar Sesión
            </IonButton>
          </IonMenuToggle>
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
