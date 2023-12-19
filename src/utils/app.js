const express = require('express')
const handlebars = require('express-handlebars')
const {Server} = require('socket.io')

const ProductManagerMongo = require('../dao/managerMongo/ProductManagerMongo')
const manager = new ProductManagerMongo(/*'./json/products.json'*/)

const MessageManagerMongo = require('../dao/managerMongo/MessageManagerMongo')
const managerM = new MessageManagerMongo(/*'./json/messages.json'*/)

/*const UserManager = require('../dao/managerFS/UserManager')
const managerU = new UserManager('./json/users.json')*/

const app = express()

const PORT = 8080
const httpServer = app.listen(PORT,()=>console.log(`Servidor corriendo en el puerto ${PORT}`))

const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}))



/*HANDLEBARS*/
app.engine('handlebars',handlebars.engine())
app.set('views','./views')
app.set('view engine','handlebars')


/*CARPETA PUBLIC*/
app.use(express.static('public'))


/*healthcheck*/
app.get('/healthcheck',(req,res)=>{
    res.status(200).json({
        status: "running",
        date: new Date()
    })
})

io.on('connection',socket=>{
    console.log('Nuevo cliente conectado '+socket.id)
    /*PRODUCTOS*/
    socket.on('newProductCaS',async data=>{
        const product = JSON.parse(data)
        const productCreated = await manager.createProduct(product)
        if(productCreated){
            delete productCreated.thumbnails
            io.emit('newProductSaC',JSON.stringify(productCreated))
        }
    })

    /*CHAT*/
    socket.on('joinChat', async username=>{
        socket.broadcast.emit('newUser',`${username} se ha unido al chat`)
        socket.emit('newUser',`Bienvenid@ al chat ${username}`)
        const messages = await managerM.getMessages()
        socket.emit('messagesAnt',JSON.stringify(messages))
    })
    socket.on('newMessage',async objString=>{
        const obj = JSON.parse(objString)
        await managerM.createMessage(obj)
        io.emit('messages',JSON.stringify(obj))
    })
})

module.exports = {app,io}