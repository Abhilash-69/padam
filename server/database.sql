drop table if EXISTS USER_REVIEW;
drop table if EXISTS WATCH;
drop table if EXISTS ACTS;
drop table if EXISTS MOVIE_IMAGE;
drop table if EXISTS MOVIE;
drop table if EXISTS USERs;
drop table if EXISTS OTT_NAME;
drop table if EXISTS CREW_IMAGE;
drop table if EXISTS CREW_NAME;
drop table if EXISTS CREW;
drop table if EXISTS OTT;
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
     m_id TEXT ,
     FOREIGN KEY (m_id) REFERENCES MOVIE (m_id),
     m_image TEXT

);

CREATE TABLE IF NOT EXISTS CREW(
    c_id SERIAL PRIMARY KEY,
    c_name text,
    birthday text,
    birthplace text,
    about text,
    c_image text
);



CREATE TABLE IF NOT EXISTS ACTS(
    m_id text ,
    FOREIGN KEY (m_id) REFERENCES MOVIE (m_id),
    c_id int ,
    Foreign Key (c_id) REFERENCES CREW(c_id),
    character TEXT,
    cc_image TEXT

);

CREATE TABLE IF NOT EXISTS OTT(
    o_id SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS OTT_NAME(
       o_id int ,
       Foreign Key (o_id) REFERENCES OTT(o_id),
       o_name TEXT
);

CREATE TABLE IF NOT EXISTS WATCH(

     m_id TEXT ,
     FOREIGN KEY (m_id) REFERENCES MOVIE (m_id),
     o_id int ,
     Foreign Key (o_id) REFERENCES OTT(o_id)

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
    u_id INT,
    FOREIGN KEY (u_id) REFERENCES USERS(u_id),
    review TEXT

);








