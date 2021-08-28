// Lectura de variable de entorno (.env)
require("dotenv").config();
//conexion a posgresql
const { Pool } = require("pg");
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

const getPaises= async (req,res)=>{
    //Tiene su tiempo-await y async asincrono
    const respuesta= await pool.query('SELECT id, pais, iso3 FROM public.paises');
    res.status(200).json(respuesta.rows);
}
const getMedallas= async (req,res)=>{
    const respuesta= await pool.query('SELECT * FROM public.medallas');
    res.status(200).json(respuesta.rows);
}
const getUsersId = async (req,res)=>{
    const respuesta= await pool.query('SELECT * FROM participantes WHERE id=$1',[req.params.id]);
    res.status(200).json(respuesta.rows);
}

const getTriunfoMedalla = async (req,res)=>{
    const respuesta= await pool.query(`SELECT public."victorias"."id", public."victorias"."id_deporte", public."victorias"."id_evento",
    public."victorias"."id_medalla", public."victorias"."id_pais", public."victorias"."id_participante",
    public."deportes"."deporte", public."medallas"."medalla", public."paises"."pais", public."paises"."ruta_foto", 
    public."participantes"."participante", public."participantes"."sexo", public."victorias"."competicion"
    
    FROM public.victorias inner join public."deportes" on public."deportes"."id" = public."victorias"."id_deporte"
    inner join public."medallas" on public."medallas"."id" = public."victorias"."id_medalla"
    inner join public."paises" on public."paises"."id" = public."victorias"."id_pais"
    inner join public."participantes" on public."participantes"."id" = public."victorias"."id_participante"
    
    WHERE public."medallas"."medalla" = $1
    
    group by public."victorias"."id", public."victorias"."id_deporte", public."victorias"."id_evento",
    public."victorias"."id_medalla", public."victorias"."id_pais", public."victorias"."id_participante",
    public."deportes"."deporte", public."medallas"."medalla", public."paises"."pais", public."paises"."ruta_foto", public."participantes"."participante",
    public."participantes"."sexo", public."victorias"."competicion";` ,[req.params.medalla]);
    res.status(200).json(respuesta.rows);
}

const getTriunfoPais = async (req,res)=>{
    const respuesta= await pool.query(`SELECT public."victorias"."id", public."victorias"."id_deporte", public."victorias"."id_evento",
    public."victorias"."id_medalla", public."victorias"."id_pais", public."victorias"."id_participante",
    public."deportes"."deporte", public."medallas"."medalla", public."paises"."pais", public."paises"."ruta_foto",
    public."participantes"."participante",public."participantes"."sexo", public."victorias"."competicion"
    
    FROM public.victorias inner join public."deportes" on public."deportes"."id" = public."victorias"."id_deporte"
    inner join public."medallas" on public."medallas"."id" = public."victorias"."id_medalla"
    inner join public."paises" on public."paises"."id" = public."victorias"."id_pais"
    inner join public."participantes" on public."participantes"."id" = public."victorias"."id_participante"
    
    WHERE public."paises"."iso3" = $1
    
    group by public."victorias"."id", public."victorias"."id_deporte", public."victorias"."id_evento",
    public."victorias"."id_medalla", public."victorias"."id_pais", public."victorias"."id_participante",
    public."deportes"."deporte", public."medallas"."medalla", public."paises"."pais", public."paises"."ruta_foto", public."participantes"."participante",
    public."participantes"."sexo", public."victorias"."competicion";` ,[req.params.iso3]);
    res.status(200).json(respuesta.rows);
}


module.exports={
    getUsersId,
    getPaises,
    getMedallas,
    getTriunfoMedalla,
    getTriunfoPais
}
