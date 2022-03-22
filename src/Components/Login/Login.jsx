import React, {useEffect} from 'react'
import {reduxForm} from "redux-form";
import {connect, useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import s from "./login.module.css"
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../Utils/validators/validator";
import {AuthApi, UsersApi} from "../../api/api";
import {getUserAuthData, login} from "../../Redux/auth_reducer";

const LoginForm = (props) => {
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

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = () => {
    /*useEffect(() => {
        AuthApi.auth().then(
            response => response.text()).then(
            result => {
                let users = JSON.parse(result)
            }
        )
    },[])*/
    const dispatch = useDispatch()
    const login1 = (username, password) => dispatch(login(username, password))
    const onSubmit = (formdatas) => {
        login1(formdatas.username, formdatas.password)
    }
    const isAuth = useSelector((state) => state.auth.isAuth)
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
const mapStateToProps = (state) => ({
})
export default connect(mapStateToProps, {}) (Login)