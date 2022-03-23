import {BaseThunkType, InferActionTypes } from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import { AuthApi } from "../api/api";

let initialState = {
    id: null as number | null,
    username: null as string | null,
    email: null as string | null,
    isAuth: false
}
export type InitialStateT = typeof initialState

export const authReducer = (state = initialState, action: ActionsTypes):InitialStateT => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (id: number | null, username: string | null, email:string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        payload:{id, username, email, isAuth}} as const)
}
export const getUserAuthData = ():ThunkTypes => async (dispatch) => {
    await AuthApi.me().then((resp) => {
        debugger
    let {id, username, email} = resp.data
    dispatch(actions.setAuthUserData(id , username, email,true ))
    })
}
export const login = (username:string, password: string):ThunkTypes => async (dispatch) => {
    let loginData = await AuthApi.login(username, password)
    if (loginData.data != undefined) {
        localStorage.setItem("Uid", loginData.data[0].id)
        dispatch(getUserAuthData())
    }else {
        dispatch(stopSubmit("login", {_error: "message"}))
    }
}
export const logou = ():ThunkTypes => {
    return async (dispatch) => {
    dispatch(actions.setAuthUserData(null , null, null, false ))
    localStorage.removeItem('access')
}}
export const getAuth = (username:string,email:string, password:string):ThunkTypes => async (dispatch) => {
    let authTest = await AuthApi.login(username, password)
    if(authTest.data[0] === undefined){
       let authResponse = await AuthApi.auth(username, email, password)
    }else{
        dispatch(StopSubmit("auth", "Такой пользователь уже существет"))
    }

}
export const StopSubmit = (formName:string, error:string) => (dispatch:any) => {
    dispatch(stopSubmit(formName, {_error: error}))
}
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkTypes = BaseThunkType<ActionsTypes | FormAction>
