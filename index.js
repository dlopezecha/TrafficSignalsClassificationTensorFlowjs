// Se importa librería que crea un servidor
let express = require("express");
let app = express();
const PORT = 3000; //Puerto a usar para abrir el servidor
app.use(express.static("./WebSite"));
app.listen(PORT, function() {
    console.log(`Listening at http://localhost:${PORT}`);
});
