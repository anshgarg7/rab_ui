const keyName = "hotel";
function login(obj){
    let str = JSON.stringify(obj);
    localStorage.setItem(keyName,str)

}
function logout(){
    console.log("hji")
    localStorage.removeItem(keyName)
}
function getUser(){
    let str = localStorage.getItem(keyName);
    let obj = str ? JSON.parse(str):null;
    return obj;
}

export default{
    login,
    logout,
    getUser,
}