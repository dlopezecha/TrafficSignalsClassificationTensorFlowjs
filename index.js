// Se importa librería que crea un servidor
let express = require("express");
// Se instancia la librería express
let app = express();
// Se define puerto de ejecución
const PORT = 3000;
// Se establece ubicación de la carpeta del servidor
app.use(express.static("./WebSite"));
// Se abre el puerto
app.listen(PORT, function() {
    console.log(`Listening at http://localhost:${PORT}`);
});
