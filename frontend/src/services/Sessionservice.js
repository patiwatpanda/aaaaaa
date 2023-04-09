
//เก็บ token / user => session storage
export const authenticate =(response)=>{
    //เก็บข้อมูลลง session storage
    if(window !== "undefinded"){
    sessionStorage.setItem("token",JSON.stringify(response.data.token))
    sessionStorage.setItem("user",JSON.stringify(response.data.username))
    sessionStorage.setItem("userpermission",JSON.stringify(response.data.userpermission))
    }
    //next()
    }
    
    //ดึงข้อมูล token
    export const getToken=()=>{
        if(window !== "undefinded"){
            //เช็คว่ามีกล่องชื่อ token ไหม
            if(sessionStorage.getItem("token")){
                return JSON.parse(sessionStorage.getItem("token"))
            }else{
                return false
            }
        }
    }
    
    //ดึงข้อมูล user
    export const getUser=()=>{
        if(window !== "undefinded"){
            if(sessionStorage.getItem("user")){
                return JSON.parse(sessionStorage.getItem("user"))
            }else{
                return false
            }
        }
    }
    export const getUserPermission=()=>{
        if(window !== "undefinded"){
            //เช็คว่ามีกล่องชื่อ token ไหม
            if(sessionStorage.getItem("userpermission")){
                return JSON.parse(sessionStorage.getItem("userpermission"))
            }else{
                return false
            }
        }
    }
    //logout
    export const logout=(next)=>{

    
        if(window!== "undefined"){
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("user")
            sessionStorage.removeItem("userpermission")
        }
    
        next()
    }