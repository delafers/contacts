import React from 'react'
import {reduxForm, stopSubmit} from "redux-form";
import {connect, useSelector} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import s from "./login.module.css";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {StopSubmit} from "../../Redux/auth_reducer";
import {getAuth} from "../../Redux/auth_reducer";
import {required} from "../../Utils/validators/validator";

const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField("Имя пользователя",'username',[required], Input)}
            </div>
            <div>
                {createField("Почта",'email',[required], Input)}
            </div>
            <div>
                {createField("Пароль",'password',[required], Input,"password")}
            </div>
            <div>
                {createField("Подтверждение пароля",'password2',[required], Input,"password")}
            </div>
            { (props.error !== "Created" && props.error !== undefined) && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button className={s.authButton}>Создать пользователя</button>
            </div>
            <div className={s.text}>
                {props.error === "Created" && <div className={s.after}><div>Аккаунт создан</div>Подтвердите его через почту</div>}
            </div>
        </form>
    )
}
const CreateAccountReduxForm = reduxForm({form: 'auth'})(LoginForm)

const Registration = (props) => {
    const onSubmit = (formdatas) => {
        if(formdatas.password === formdatas.password2){
        props.getAuth(formdatas.username, formdatas.email, formdatas.password)
        } else {
            props.StopSubmit("auth", "Пароли не совпадают")
        }
    }
    const isAuth = useSelector((state) => state.auth.isAuth)
    if(isAuth){
        return <Redirect to="/"/>
    }
    return<div className={s.center}>
        <h1>Создать пользователя</h1>
        <CreateAccountReduxForm onSubmit={onSubmit}/>
        <p>
            <NavLink to='/login'> Уже есть аккаунт?
                <div>
                    Перейти к авторизации
                </div>
            </NavLink>
        </p>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth
})

export default connect(mapStateToProps, {getAuth, StopSubmit }) (Registration)