CREATE DATABASE FRESH;

CREATE TABLE MOVIE(
    m_id text PRIMARY KEY,
    m_name varchar(255),
    synopsis text,
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

CREATE TABLE MOVIE_IMAGE
(
     m_id TEXT ,
     FOREIGN KEY (m_id) REFERENCES MOVIE (m_id),
     m_image TEXT

);

CREATE TABLE CREW(
    c_id SERIAL PRIMARY KEY,
    birthday date,
    birthplace text,
    about text,
    c_image text,
    m_id text ,
    FOREIGN KEY (m_id) REFERENCES MOVIE (m_id)
);

CREATE TABLE CREW_NAME(
    c_id int,
    Foreign Key (c_id) REFERENCES CREW(c_id),
    c_name varchar(255)
);

CREATE TABLE CREW_IMAGE(
    c_id int ,
    Foreign Key (c_id) REFERENCES CREW(c_id),
    c_image text
);

CREATE TABLE OTT(
    o_id SERIAL PRIMARY KEY

);

CREATE TABLE OTT_LOGO(
       o_id int ,
       Foreign Key (o_id) REFERENCES OTT(o_id),
       o_name TEXT
);

CREATE TABLE USER (

    u_id SERIAL PRIMARY KEY 

)








