const jsonServer = require("json-server");
const cors = require("cors");
const { writeFileSync } = require("fs");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
// Add this before server.use(router)
server.use(
    jsonServer.rewriter({
        "/*": "/$1",
    })
);

// Armazena o banco de dados em memória
let db = null;

// Middleware para salvar o banco de dados em 'db.json' antes de responder
server.use((req, res, next) => {
    db.write();
    next();
});

// Cria um banco de dados em memória
db = jsonServer.router("db.json").db;

server.listen(process.env.PORT || 3000, () => {
    console.log(`JSON Server is running`);
});
