const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database");
const {scrap_movie_name} = require("./scrap")
const {scrap_movie_info} = require("./scrap")
const {scrap_synopsis} = require("./scrap")
const {scrap_movie_img} = require("./scrap")
const {scrap_cast_and_crew} = require("./scrap");
const {scrap_actor_info} = require("./castScrap");
const {v4} = require("uuid4"); 
app.use(cors());
app.use(express.json())

app.get("/api/a/:actor_name",async (req,res)=>{
    const actor_name = req.params.actor_name;
    console.log(actor_name);
    let resp = await db.query(`select * from crew where c_name='${actor_name}'`);
    if(resp.rowCount===0){
        console.log("scrap")
        const obj= await scrap_actor_info(actor_name);
        const s = await db.query("insert into crew(c_name,birthday,birthplace,about) values($1,$2,$3,$4) RETURNING *",[actor_name,obj.actor_bday,obj.actor_bplace,obj.actor_bio]);        
        res.json(s.rows[0])
    }
    else{
        res.json(resp.rows[0])
    }
})

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
        const s = await db.query("insert into movie(m_name,synopsis,poster,genre,original_language,director,producer,writer,release_date_theaters,runtime,distributor,production_co,aspect_ratio) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",[mov,synop,poster,info.Genre,info.Original_Language,info.Director,info.Producer,info.Writer,info.Release_Date,info.Runtime,info.Distributor,info.Production_Co,info.Aspect_Ratio]);       
        res.json(s.rows[0])
    }
    else{
        res.json(resp.rows[0])
    }
})

app.listen(8000,()=>{
    console.log("Listening on port 8000");
})