import React, {useState} from 'react'
import s from './Support.module.css'
import userImg from '../../assets/images/User_Avatar.png'
import {NavLink} from "react-router-dom";

let User = ({user, deleteContact}) => {

    return <div className={s.user}>
           <div >
               <div>
                <div>
                    <img src={user.photo != null ? user.photo : userImg} className={s.userimg}/>
                    {user.name}
                    {user.email}
                    {user.phone}
                    <span onClick={() => {deleteContact(user.id)}}>
                    X
                    </span>
                </div>
                </div>
                <div>
                    {user.followed
                        ? <button className={s.userbuttonD}
                                  onClick={() => {}}>
                            Unfollow</button>
                        : <button className={s.userbuttonA}
                                  onClick={() => {}}>
                            Follow</button>}
                </div>
            </div>

    </div>

}


export default User