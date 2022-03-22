import {updateObjectInArray} from "../Utils/objectHelper";
import {PhotosType, ContactType} from "../types/types";
import {AppStateType, BaseThunkType, InferActionTypes} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/api"
import {reset} from "redux-form";

let initialState = {
    contacts: [] as Array<ContactType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    img: null as File | null,
    followingInProgress: [2, 3] as Array<number>, //id пользователей, на которых нельзя подписатья
    filter:{
        term: ""
    }
};
export type InitialStateType = typeof initialState

const contactsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SET_USERS":
            return {
                ...state,
                contacts: action.users
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case "SET_FILTER":
            return {
                ...state,
                filter: action.payload
            }
        case "SET_TOTAL_USERS_COUNT":
            return {
                ...state,
                totalUsersCount: action.count
            }

        case "TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "SAVE_PHOTO": {
            return {
                ...state,
                img: action.photo
            }
        }
        default:
            return state;

    }
}


export const actions = {
    setUsers: (users: Array<ContactType>) => ({type: "SET_USERS", users} as const),
    setCurrentPage: (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage} as const),
    setFilter: (filter: FilterType) => ({type: "SET_FILTER", payload:filter} as const),
    setTotalUsersCount: (totalCount: number) => ({
        type: "SET_TOTAL_USERS_COUNT",
        count: totalCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const),
    setPhoto: (photo:File) => ({type: "SAVE_PHOTO", photo}as const)
}

type ActionTypes = InferActionTypes<typeof actions>

type getStateType = () => AppStateType
type DispatchType = Dispatch<ActionTypes>
type ThunkType = BaseThunkType<ActionTypes>

export const requestContacts = (page: number, filter:FilterType): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFilter(filter))
        // @ts-ignore
        let data = await usersAPI.all(page, filter.term)
        debugger
        dispatch(actions.toggleIsFetching(false))
        // @ts-ignore
        dispatch(actions.setUsers(data.data));
        //dispatch(actions.setTotalUsersCount(data.totalCount));

    }
}
export const SetPhoto = (photo:File) => (dispatch:any) => {
    dispatch(actions.setPhoto(photo))
}
export const deleteContacts = ():ThunkType => {
    return async (dispatch, getState) => {
        await usersAPI.delete(1).then((a) => {
            dispatch(requestContacts(getState().contacts.currentPage, {term: ""}))
        })
    }
}
export const addContactToServer = (name: string, phone:number, email:string, photo:string):ThunkType => {
    return async (dispatch) => {
        await usersAPI.addNew(name, phone, email, photo).then(() => {
                dispatch(requestContacts(1, {term: ""}))
                // @ts-ignore
                dispatch(reset("createPost"))
            }
        )
    }
}
export type FilterType = typeof initialState.filter
export default contactsReducer