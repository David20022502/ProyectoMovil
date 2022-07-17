import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from "react-router"
import ExploreContainer from "../components/ExploreContainer"
import Menu from "../components/Menu"
import LugaresEdit from "./lugares/lugaresEdit"
import LugaresList from "./lugares/LugaresList"

export const HomePage = () => {
    return <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
            <Route path="/dashboard" exact={true}>
                <Redirect to="/page/lugares" />
            </Route>
            <Route path="/page/lugares" exact={true}>
                <LugaresList></LugaresList>
            </Route>

            <Route path="/page/lugares/:id" exact={true}>
                <LugaresEdit></LugaresEdit>
            </Route>


        </IonRouterOutlet>
    </IonSplitPane>

}