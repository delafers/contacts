import React, {useState} from 'react'
import s from './Support.module.css'
import userImg from '../../assets/images/User_Avatar.png'
import {NavLink} from "react-router-dom";

let User = ({user, deleteContact}) => {
    return <div className={s.user}>
               <div>
                <div>
                    <div>
                    <img src={user.photo != null ? user.photo : userImg} className={s.userimg}/>
                        <span>
                        Имя: {user.name}
                        </span>

                    </div>
                    <div>
                    Почта: {user.email}
                        <span>
                    Телефон: {user.phone}
                        </span>
                    </div>

                </div>
                </div>
                <div>
                    {!user.followed
                        ? <button className={s.userbuttonD}
                                  onClick={() => {deleteContact(user.id)}}>
                            Удалить</button>
                        : <button className={s.userbuttonA}
                                  onClick={() => {}}>
                            Follow</button>}
                </div>
    </div>

}


export default User