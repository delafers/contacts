import React from "react";
import s from "./Main.module.css"
const Main = () => {
    return(<>
    <div className={s.main}>
        <h1>Main info</h1>
        <div>
            Сайт создан как выполнение тестового задания.
            <div>
                На нем реализована система авторизации и аутентификации. В качестве базы данных испольхуется json-server
            </div>
            <div>
                Есть возможность создавать, искать, удалять контакты
            </div>
            <div>
                Реализована система редиректов, в зависимости от авторизации пользователя
            </div>
        </div>
    </div>
    </>
        )
}

export default Main