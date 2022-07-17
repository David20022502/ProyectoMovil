import { IonApp, IonContent, IonHeader, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useContext } from 'react';
import { Redirect, Route, useHistory } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import Menu from '../components/Menu';
import HomeContext from '../context/HomeContext';
import { HomeStates } from '../context/HomeStates';
import './Home.css';
import { HomePage } from './HomePage';
import HuecasEdit from './huecas/HuecasEdit';
import HuecasList from './huecas/HuecasList';
import IglesiasEdit from './Iglesias/IglesiasEdit';
import IglesiasList from './Iglesias/IlglesiasList';
import Login from './Login';
import LugaresEdit from './lugares/lugaresEdit';
import LugaresList from './lugares/LugaresList';
import Signup from './Signup';

const Home = () => {
  //const { isAutenticated }: any = useContext(HomeContext)



  /*React.useEffect(() => {
    console.log("se autentico", isAutenticated)
    if (isAutenticated) {
      // history.push('/dashboard');
      console.log("cambiando pagina")
    }
  }, [isAutenticated])*/
  return (
    <IonReactRouter>

      <IonRouterOutlet>
        <HomeStates>

          <Route exact path="/signup">
            <Signup />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/admin/admin" exact={true}>
            <Redirect to="/admin/huecas" />
          </Route>
          <Route exact path="/admin">
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/admin" >
                  <LugaresList></LugaresList>
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>

          <Route path="/admin/lugares" exact={true}>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/admin/lugares" exact={true}>
                  <LugaresList></LugaresList>
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/admin/admin/lugares" exact={true}>
            <Redirect to="/admin/lugares" />
          </Route>
          

          <Route path="/admin/lugares/:id" exact={true}>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/admin/lugares/:id" exact={true}>
                  <LugaresEdit></LugaresEdit>
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/admin/huecas" exact={true}>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/admin/huecas" exact={true}>
                  <HuecasList></HuecasList>
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/admin/admin/huecas" exact={true}>
            <Redirect to="/admin/huecas" />
          </Route>
          <Route path="/admin/huecas/:id" exact={true}>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/admin/huecas/:id" exact={true}>
                  <HuecasEdit></HuecasEdit>

                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/admin/iglesias" exact={true}>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/admin/iglesias" exact={true}>
                  <IglesiasList></IglesiasList>

                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/admin/admin/iglesias" exact={true}>
            <Redirect to="/admin/iglesias" />
          </Route>
          <Route path="/admin/iglesias/:id" exact={true}>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/admin/iglesias/:id" exact={true}>
                  <IglesiasEdit></IglesiasEdit>

                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

        </HomeStates>
      </IonRouterOutlet>
    </IonReactRouter>



  );
};



const DashboardPage = () => {
  return <p>hola</p>
}
export default Home;


/*
<HomeStates>

      <IonRouterOutlet>


        <Route exact path="/signup">
          <Signup />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/dashboard">
         <p>hola mundo</p>
        </Route>
        <Route exact path="/dashboard1">
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/dashboard1" >
                <LugaresList></LugaresList>
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </Route>

        <Route path="/dashboard/page/lugares" exact={true}>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/dashboard/page/lugares" exact={true}>
                <LugaresList></LugaresList>
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </Route>

        <Route path="/dashboard/page/lugares/:id" exact={true}>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/dashboard/page/lugares/:id" exact={true}>
                <LugaresEdit></LugaresEdit>
              </Route>



            </IonRouterOutlet>
          </IonSplitPane>
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>


      </IonRouterOutlet>

    </HomeStates>

 */