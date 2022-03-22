import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import Loading from "../common/Loading/Loading";
import UsersPageC from "./UsersPage";

type UsersPageProps = {

}
const UsersPage: React.FC<UsersPageProps> = (props) => {
    const isFetching = useSelector((state: AppStateType) => state.contacts.isFetching  )
    return <>
        {isFetching ? <Loading/> : null}
        <UsersPageC />
    </>
}
export default UsersPage