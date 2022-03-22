import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import { logou } from "../../Redux/auth_reducer";
type propsType = {

}
const Header:React.FC<propsType> = (props) => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const username = useSelector((state: AppStateType) => state.auth.username)
    const dispatch = useDispatch();
    const Logout = () => { dispatch(logou())}
    return (
        <header className={s.header}>
            <span >
                    {isAuth
                        ? <span>{username}<button onClick={() => {Logout()}}>Выйти</button></span>
                        : <NavLink to='/login' activeClassName={s.active}>Авторизация</NavLink>}
                    </span>
        </header>
    )
}

export default Header;