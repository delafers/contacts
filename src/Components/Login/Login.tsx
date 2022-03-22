import React, {useEffect} from 'react'
import {InjectedFormProps, reduxForm} from "redux-form";
import {connect, useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import s from "./login.module.css"
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../Utils/validators/validator";
import {AuthApi} from "../../api/api";
import {getUserAuthData, login} from "../../Redux/auth_reducer";
import {AppStateType} from "../../Redux/redux-store";
type OwnProps = {
    error?: string | null
}
const LoginForm:React.FC<InjectedFormProps<LoginFormTypes, OwnProps> & OwnProps> = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField("Имя пользователя", "username", [required], Input)}
            </div>
            <div>
                {createField("Пароль", "password", [required], Input, "password")}
            </div>
            { props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div className={s.authButton}>
                <button>Авторизоваться</button>
            </div>
        </form>
    )
}
export type LoginFormTypes = {
    username:string,
    password: string,
}


const LoginReduxForm = reduxForm<LoginFormTypes, OwnProps>({form: 'login'})(LoginForm)

const Login:React.FC = () => {
    const dispatch = useDispatch()
    const login1 = (username:string, password:string) => dispatch(login(username, password))
    const onSubmit = (formdatas:LoginFormTypes) => {
        login1(formdatas.username, formdatas.password)
    }
    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)
    if(isAuth){
        return <Redirect to="/"/>
    }
    return<div className={s.center}>
        <h1>Авторизация</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
        <p>
            <NavLink to='/auth'>Если ты не зарегистрирован, жми сюда</NavLink>
        </p>
    </div>
}
const mapStateToProps = (state:AppStateType) => ({
})
export default connect(mapStateToProps, {}) (Login)