import React, {useEffect, useState} from "react"
import {usersAPI} from "../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import Paginator from "../common/Paginator/Paginator";
import UsersSearchForm from "./UsersSearchForm";
import User from "./OneUser";
import {AppStateType} from "../../Redux/redux-store";
import {deleteContacts, FilterType, requestContacts} from "../../Redux/contacts_reducer";
import {parse} from "query-string";
import ModalCreate from "./CreateNews";
import NewPostCreate from "./CreatePost";
import s from "./Support.module.css"


const UsersPageC = () => {
    const users = useSelector((state: AppStateType) => state.contacts.contacts)
    const currentPage = useSelector((state: AppStateType) => state.contacts.currentPage)
    const filter = useSelector((state: AppStateType) => state.contacts.filter)
    const totalUsersCount = 30
    const dispatch = useDispatch()
    const deleteContact = dispatch(deleteContacts)
    const queryString = require('query-string')
    const history = useHistory()
    useEffect(() => {
        const parsed = queryString.parse(history.location.search);
        let actualPage = currentPage
        let actualFilter = filter
        if (parsed.page) actualPage = +parsed.page
        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        dispatch(requestContacts(actualPage, actualFilter))
    }, [])
    const onPageChanged = (pageNumber: number,) => {
        dispatch(requestContacts(pageNumber, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestContacts(1, filter))
    }
    const [modalActive, setModalActive] = useState(false)

    return (
        <div>
            <div>
                <UsersSearchForm onFilterChanged={onFilterChanged}/>
            </div>
            <div className={s.paginator}>
                <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                           totalItemsCount={totalUsersCount} pageSize={10}/>
            </div>
            <div className={s.modal}>
                <button onClick={() => setModalActive(true)}>Добавить новость</button>
            </div>
            <div>
                <ModalCreate active={modalActive} setActive={setModalActive}>
                    <NewPostCreate setActive={setModalActive}/>
                </ModalCreate>
            </div>
            <div>
                {
                    users.map(u => <User key={u.id} user={u} deleteContact={deleteContact}/>)
                }
            </div>
        </div>
    )
}
export default UsersPageC