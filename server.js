require('dotenv').config(); // define o dotenv para ser usado. 
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet'); //recomendação do express para aumentar segurança
const csrf = require('csurf');
const meuMiddleware = require('./src/middlewares/middleware');
const mongoose = require('mongoose');

//********CONEXÃO A BASE DE DADOS***************************************************************/
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        app.emit('pronto');
    })
    .catch(e => console.log(e));
//**********************************************************************************************/

//********Pacotes necessários para controle de sessão*******************************************/
const session = require('express-session'); // faz o controle de sessão com cookies
const MongoStore = require('connect-mongo') // salva as sessões na base de dados
const flash = require('connect-flash'); // envio de mensagens de sessão
//**********************************************************************************************/

//***Parâmetros de configuração do Express******************************************************/
app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'public')))

// Define parâmetros da sessão
const sessionOptions = session({
    secret:'1234567890987654321234567890',
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*7, //define a sessão para 7 dias
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); // define o local dos arquivos HTML
app.set('view engine', 'ejs'); //define a engine para renderizar o HTML

app.use(csrf()); // define uso do CSRF (CSURF)

// usando nossos próprios middleware
app.use(meuMiddleware.middlewareGlobal)
app.use(meuMiddleware.checkCsrfError)
app.use(meuMiddleware.csrfMiddleWare)
app.use(routes);
//***********************************************************************************************/

//***Após conexão do BD, start do servidor*******************************************************/
app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('http://localhost:3000/')
        console.log('servidor executando na porta 3000');
    });
})
//***********************************************************************************************/
