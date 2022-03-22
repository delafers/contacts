import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import { authReducer } from "./auth_reducer";
import appReducer from "./app_reducer";
import contactsReducer from "./contacts_reducer";


let RootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    contacts: contactsReducer,
    form: formReducer
    }
)

type RootReducerType = typeof RootReducer
type PropertiesTypes<T> = T extends {[key:string]: infer U} ? U : null

export type InferActionTypes<T> = T extends {[key:string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore
window.__store__ = store;

export default store