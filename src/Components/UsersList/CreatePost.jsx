import React, {useState} from 'react'
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {createField, Input, Textarea} from "../common/FormsControls/FormsControls";
//import {addPostToServer, SetPhoto} from "../../Redux/demosNews_reducer";
import {required} from "../../Utils/validators/validator";
import s from "./Post.module.css"
import {addContactToServer, SetPhoto} from "../../Redux/contacts_reducer";


const NewsForm = (props) => {
    const onMainPhotoSelected = (e) => {
        if(e.target.files.length){
            props.setPhoto(e.target.files[0])
        }
    }
    debugger
    return(
        <form onSubmit={props.handleSubmit}>
            <div className={s.Post}>
            <div>
                {createField("Имя",'user',[required], Textarea)}
            </div>
            <div>
                {createField("Телефон",'phone',[required], Textarea)}
            </div>
            <div className={s.Post}>
                {createField("Почта",'email',[required], Textarea)}
            <div>
                <div>
                    <input type="file"  onChange={onMainPhotoSelected}/>
                </div>
                <button>Добавить контакт</button>
            </div>
            </div>
            </div>
        </form>
    )
}
const CreatePostReduxForm = reduxForm({form: 'createPost'})(NewsForm)

const NewPostCreate = (props) => {
    debugger
    const onSubmit = (formdatas) => {
        debugger
        props.addContactToServer(formdatas.user, formdatas.phone, formdatas.email, props.img )
        props.setActive(false)
        //props.setPhoto(null)
    }
    return<div >
        <h2>Добавление контакта</h2>
        <CreatePostReduxForm onSubmit={onSubmit} setPhoto={props.SetPhoto}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth,
    img: state.contacts.img
})

export default connect(mapStateToProps, { addContactToServer, SetPhoto }) (NewPostCreate)