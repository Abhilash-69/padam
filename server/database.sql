drop table if EXISTS USER_REVIEW;
drop table if EXISTS WATCH;
drop table if EXISTS ACTS;
drop table if EXISTS MOVIE_IMAGE;
drop table if EXISTS USERs;
drop table if EXISTS OTT_NAME;
drop table if EXISTS CREW_IMAGE;
drop table if EXISTS CREW_NAME;
drop table if EXISTS CREW;
drop table if EXISTS OTT;
drop table if EXISTS MOVIE;
drop table if EXISTS ACTOR;

CREATE TABLE IF NOT EXISTS MOVIE(
    m_id text PRIMARY KEY,
    m_name varchar(255),
    synopsis text,
    poster text,
    genre text,
    original_language text,  
    director text,
    producer text,
    writer text,
    release_date_theaters text,
    runtime text,
    distributor text,
    production_co text,
    aspect_ratio text
);

CREATE TABLE IF NOT EXISTS MOVIE_IMAGE
(
    img_id SERIAL PRIMARY KEY,
    m_id TEXT ,
    FOREIGN KEY (m_id) REFERENCES MOVIE (m_id),
    m_image TEXT

);

-- CREATE TABLE IF NOT EXISTS ACTOR(
--     c_name text PRIMARY KEY,
--     birthday text,
--     birthplace text,
--     about text,
--     c_image text
-- );      



CREATE TABLE IF NOT EXISTS CREW(
    m_id text ,
    FOREIGN KEY (m_id) REFERENCES MOVIE (m_id),
    c_name text  ,
    -- Foreign Key (c_name) REFERENCES ACTOR(c_name),
    -- Primary Key(m_id,c_name),
); 

CREATE TABLE IF NOT EXISTS OTT(
    o_name Text Primary Key,
    o_link Text 
);


CREATE TABLE IF NOT EXISTS WATCH(

     m_id TEXT ,
     FOREIGN KEY (m_id) REFERENCES MOVIE (m_id),
     o_name TEXT,
     Foreign Key (o_name) REFERENCES OTT(o_name),
     Primary Key(m_id,o_name)


);

CREATE TABLE IF NOT EXISTS USERS(
    u_id SERIAL PRIMARY KEY,
    u_type varchar(20) CHECK (u_type IN('critics','audience')) ,
    u_name varchar(50),
    email text,
    passwd text
);

CREATE TABLE IF NOT EXISTS USER_REVIEW(
    r_id SERIAL PRIMARY KEY,
    m_id TEXT ,
    FOREIGN KEY (m_id) REFERENCES MOVIE (m_id),
    u_id TEXT,
    FOREIGN KEY (u_id) REFERENCES USERS(u_id),
    review TEXT
);


 DELETE FROM MOVIE WHERE M_ID='leo_2023_2';

SELECT * from MOVIE;




