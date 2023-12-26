const generateUserErrorInfo = (user) =>{
    return `Uno o mas campos han sido enviado incompletos o no validos
    Lista de propiedades requeridas:
    * name : valor de tipo String, se recibió ${user.name}
    * email : valor de tipo String, se recibió ${user.email}`
}