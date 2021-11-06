// Se importa librería que crea un servidor
let express = require("express");
let app = express();
let port = 3000; //Puerto a usar para abrir el servidor
app.use(express.static("./WebSite"));
app.listen(port, function() {
    console.log(`Listening at http://localhost:${port}`);
});
