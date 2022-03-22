import React from "react"
import "./CreateNews.css"
type PropsType = {
    active: boolean,
    setActive: (active:boolean) => void,

}
const ModalCreate:React.FC<PropsType> = ({active, setActive, children }) => {
    return(
        <div className={active ? "modal active" : "modal"} >
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                <span onClick={() => {setActive(false)}} className="close">X</span>
                {children}
            </div>
        </div>
    )
}

export default ModalCreate