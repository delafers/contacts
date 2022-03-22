import React from "react";
import s from "./Main.module.css"
const Main = () => {
    return(<>
    <div className={s.main}>
        <h1>Main info</h1>
    </div>
        <p>
            Сайт создан как выполнение тестового задания.
            <div>
                На нем реализована система авторизации и аутентификации. В качестве базы данных испольхуется json-server.
                Организована система редиооектов, в зависимости от автоизации пользователя.

            </div>
        </p>
    </>
        )
}

export default Main