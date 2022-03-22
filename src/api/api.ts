import axios from "axios"

export const usersAPI = {
    all(page = 1, filter = null){
        debugger
        // @ts-ignore
        if(!filter){
            return axios.get(`http://localhost:3000/contacts?_page=${page}`)
        }else{
            return axios.get(`http://localhost:3000/contacts?_page=${page}&name=${filter}`)
        }
    },
    addNew(name:string, phone:number, email:string, photo:string|null){
        debugger
        return axios.post("http://localhost:3000/contacts",{
            "name": name,
            "phone": phone,
            "email": email,
            "photo": photo
        })
    },
    delete(id:number){
        debugger
        return axios.delete(`http://localhost:3000/contacts/${id}`)
    }
}
export const AuthApi = {
    login(username= "Bot1", password="12345"){
        return axios.get(`http://localhost:3000/users?username=${username}&password=${password}`)
    },
    auth(username:string,email:string, password:string) {
        // @ts-ignore
        return axios.post("http://localhost:3000/users", {
            "username": username,
            "email": email,
            "password": password
        })
    },
    me(){
        let id = localStorage.getItem("Uid")
        return axios.get(`http://localhost:3000/users/${id}`)
    },
}