const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
//const cors = require ('cors')
//app.use(cors())

app.use (bodyParser.json());

    const livros = [
        {
        id: '1',
        titulo: 'Sherlock Holmes',
        autor: 'Konandoile',
        paginas: '456'
        },
        { 
        id: '2',
        titulo: '1984',
        autor: 'George Owel',
        paginas: '200'
        }
    ];

    app.use ((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
        next();
    });

    app.post ('/api/livros', (req, res, next) => {
       const livro = req.body;
       console.log(livro);
       res.status(201).json({mensagem: 'Livro inserido'})
    });


    app.use('/api/livros', (req, res, next) => {
        res.status(200).json({
            mensagem: "Tudo certo",
            livros: livros
        });
    });

    module.exports = app;


