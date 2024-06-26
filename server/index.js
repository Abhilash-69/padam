const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const db = require("./database");
const {scrap_movie_name} = require("./scrap")
const {scrap_movie_info} = require("./scrap")
const {scrap_synopsis} = require("./scrap")
const {scrap_movie_img} = require("./scrap")
const {scrap_cast_and_crew} = require("./scrap");
const {scrap_movie_photos} = require("./scrap")
const {scrap_actor_info} = require("./castScrap");
const {scrap_ott} = require("./scrap");
const {scrap_search} = require("./scrap");
const {v4} = require("uuid4"); 
require("dotenv").config()
const registerRoutes = require("./routes/registeration")
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
/*
app.get("/api/a/:actor_name",async (req,res)=>{
    const actor_name = req.params.actor_name;
    console.log(actor_name);
    let resp = await db.query(`select * from actor where c_name='${actor_name}'`);
    if(resp.rowCount===0){
        console.log("scrap")
        const obj= await scrap_actor_info(actor_name);
        //const img=await scrap_cast_and_crew(movie_name);
        const s = await db.query("insert into actor(c_name,birthday,birthplace,about) values($1,$2,$3,$4) RETURNING *",[actor_name,obj.actor_bday,obj.actor_bplace,obj.actor_bio]);        
        res.json(s.rows[0])
    }
    else{
        res.json(resp.rows[0])
    }
})
*/
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (u_name, email, passwd) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    res.json({ user: result.rows[0] });
  });

app.get("/api/m/:movie_name",async (req,res)=>{
    const movie_name = req.params.movie_name;
    console.log(movie_name);
    let resp = await db.query(`select * from movie where m_id='${movie_name}'`);
    if(resp.rowCount===0){
        console.log("scrap")
        const mov= await scrap_movie_name(movie_name);
        const synop = await scrap_synopsis(movie_name);
        const poster =  await scrap_movie_img(movie_name);
        const info = await scrap_movie_info(movie_name);
        const images = await scrap_movie_photos(movie_name);
        const crew = await scrap_cast_and_crew(movie_name);
        const ott = await scrap_ott(movie_name);
        const s = await db.query("insert into movie(m_id,m_name,synopsis,poster,genre,original_language,director,producer,writer,release_date_theaters,runtime,distributor,production_co,aspect_ratio) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *",[movie_name,mov,synop,poster,info.Genre,info.Original_Language,info.Director,info.Producer,info.Writer,info.Release_Date,info.Runtime,info.Distributor,info.Production_Co,info.Aspect_Ratio]);       
        for(const img of images){
            const b = await db.query("insert into movie_image(m_id,m_image) values($1,$2) RETURNING *",[movie_name,img.photo]);
        }
        for(const actor of crew){
            const c = await db.query("insert into crew(m_id,c_name,c_link,c_role) values($1,$2,$3,$4) RETURNING *",[movie_name,actor.actorName,actor.imageUrl,actor.characterName]);
        }
        for(const ot of ott){
            const o = await db.query("insert into ott(m_id,o_name,o_link) values($1,$2,$3) RETURNING *",[movie_name,ot.ottName,ot.ottLink]);   
        }
        res.json(s.rows[0])
    }
    else{
        console.log(resp.rowCount)
        res.json(resp.rows[0])
    }
})

app.get("/api/search/:search_key", async (req,res) =>{
    const search_key =req.params.search_key;
    const s = await scrap_search(search_key);
    console.log(s);
    res.json(s);
})

app.get("/api/ott/:movie_name", async (req,res) => {
    const movie_name = req.params.movie_name;
    const ott = await scrap_ott(movie_name);
    const resp = await db.query(`SELECT * FROM ott WHERE m_id = $1`, [movie_name]);
    res.json(resp.rows);
})

app.get("/api/cast/:movie_name", async (req,res) => {
    const movie_name = req.params.movie_name;
    const ott = await scrap_cast_and_crew(movie_name);
    const resp = await db.query(`SELECT * FROM crew WHERE m_id = $1`, [movie_name]);
    res.json(resp.rows);
})

app.get("/api/photos/:movie_name", async (req,res) => {
    const movie_name = req.params.movie_name;
    const photos = await scrap_movie_photos(movie_name);
    const resp = await db.query(`SELECT * FROM movie_image WHERE m_id = $1`, [movie_name]);
    res.json(resp.rows);
})

app.use("/auth", registerRoutes)

app.listen(8000,()=>{
    console.log("Listening on port 8000");
})