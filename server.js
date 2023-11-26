// JSON Server module
const jsonServer = require("json-server");
const cors = require("cors");
const {openSync} = require("fs");
const server = jsonServer.create();
const router = jsonServer.router("db.json");

// Make sure to use the default middleware
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(middlewares);
// Add this before server.use(router)
server.use(
    // Add custom route here if needed
    jsonServer.rewriter({
        "/*": "/$1",
    })
);
server.use(router);
// Listen to port
const PORT = process.env.PORT || 3000;

openSync('db.json', 'r+');

// Export the Server API
module.exports = server;

server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
