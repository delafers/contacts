import React from "react";
import {Field, Form, Formik} from "formik";
import {FilterType} from "../../Redux/contacts_reducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import s from "./Support.module.css"

const usersSearchFormValidate = (values: any) => {
    const errors = {};
}
type UsersSearchFormPropsType = {
    onFilterChanged:(filter:FilterType) => void
}
type formType ={
    term:string | null
}
const UsersSearchForm:React.FC<UsersSearchFormPropsType> = React.memo((props) => {
    const filter = useSelector((state: AppStateType) => state.contacts.filter  )
    const submit = (values:formType, {setSubmitting}:{setSubmitting:(a:boolean) => void}) => {
        const filter:FilterType = {
            term: values.term,
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }
    return<div className={s.form}>
        <span>Поиск по имени</span>
        <Formik
            enableReinitialize={true}
            initialValues={{term: filter.term}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>

})

export default UsersSearchForm