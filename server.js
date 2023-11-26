const jsonServer = require("json-server");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const os = require("os");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);

const tempDbPath = path.join(os.tmpdir(), 'temp-db.json');

server.use((req, res, next) => {
    fs.writeFileSync(tempDbPath, JSON.stringify(db.getState(), null, 2));
    next();
});

let db = null;

db = jsonServer.router(tempDbPath).db;

server.use(
    jsonServer.rewriter({
        "/*": "/$1",
    })
);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`JSON Server is running`);
});
