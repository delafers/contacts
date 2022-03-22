import React, {useEffect} from 'react';
import './App.css';
import {compose} from "redux";
import {connect, Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import store, {AppStateType} from './Redux/redux-store';
import HeaderContainer from "./Components/Header/HeaderContainer";
import Nav from "./Components/NavBar/NavBar";
import Login from "./Components/Login/Login";
import Main from "./Components/Main/Main";
import UsersPage from "./Components/UsersList/UsersPageContainer";
import {initializeApp} from "./Redux/app_reducer";
import Registration from "./Components/Login/Registrate";
import Loading from "./Components/common/Loading/Loading";
import {withAuthRedirect} from "./HOC/withAuthRedirect";

type AppPropsT = {
    initialized:boolean,
    initializeApp: () => void
}
const App:React.FC<AppPropsT> = (props) => {
    useEffect(() => {
        if(localStorage.getItem("Uid")){
            props.initializeApp()
        }
    })
    let UsersPageWithRedirect = withAuthRedirect(UsersPage)
    if (!props.initialized) {
        return <div>
            <Loading/>
        </div>
    }
  return (
    <div className="app-wrapper">
        <HeaderContainer />
        <Nav/>
        <div className="content">
            <Switch>
                <Route exact path='/' render={() => <Main/>}/>
                <Route path='/login' render={() => <Login/>}/>
                <Route path='/auth' render={() => <Registration/>}/>
                <Route path='/users' render={() => <UsersPageWithRedirect/>}/>
            </Switch>
        </div>
    </div>
  )
}
const mapStateToProps = (state: AppStateType) => (
    {initialized: state.app.initialized})

let AppContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {initializeApp}))(App)

const FrontApp: React.FC = () => {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default FrontApp
