const {app} = require('./utils/app')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const {Command} = require('commander')
const dotenv = require('dotenv')
const compression = require('express-compression')
//const MongoStore = require('connect-mongo')
const passport = require('passport')
const flash = require('connect-flash')
const initializePassport = require('./config/passport.config')
//const productModel = require('./dao/models/productModel')
const configFn = require('./config/config')
const addLogger = require('./utils/logger');
const DB = require('./DB/singleton')
const program = new Command()

app.use(addLogger);
program
    .option('--mode <mode>','Ambiente de Trabajo','dev')

program.parse()
const options = program.opts()

 dotenv.config({
    path: `.env.${options.mode}`
})

const config =configFn()

DB.getConnection(config)

const ProductRouter = require('./router/productRouter')
const CartRouter = require('./router/cartRouter')
const ViewsRouter = require('./router/viewsRouter')
const SessionRouter = require('./router/sessionRouter')

const productRouter = new ProductRouter()
const cartRouter = new CartRouter()
const viewsRouter = new ViewsRouter()
const sessionRouter = new SessionRouter()

app.use(cookieParser('secretkey'))
app.use(session({
    secret:'secretSession',
    resave:true,
    saveUninitialized:false
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(compression({
    brotli:{enabled:true,zlib:{}}
}))

app.use('/api/products',productRouter.getRouter())
app.use('/api/carts',cartRouter.getRouter())
app.use('/',viewsRouter.getRouter())
app.use('/api/session',sessionRouter.getRouter())
