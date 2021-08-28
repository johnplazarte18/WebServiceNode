var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Olimpiadas mundiales" });
});
const {
    getPaises,
    getUsersId,
    getMedallas,
    getTriunfoMedalla,
    getTriunfoPais,
} = require("../controllers/index.controllers");

// obtener todos los paises
router.get("/paises", getPaises);
// obtener las medallas
router.get("/medallas", getMedallas);
// pasar el id del usuario
router.get("/users/:id", getUsersId);
// pasar el uso3 de un país
router.get("/triunfo-pais/:iso3", getTriunfoPais);
// pasar el nombre de una medalla
router.get("/triunfo-medalla/:medalla", getTriunfoMedalla);

module.exports = router;
