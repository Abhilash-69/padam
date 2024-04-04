const cheerio = require('cheerio');
const axios = require('axios');

const scrap_movie_name = async (movie_name) => {
  const url = `https://www.rottentomatoes.com/m/${movie_name}`;
  let moviname="";
  await axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const moviename = $('h1[slot=title]').text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
      moviname=moviename;
      // console.log(moviename)
    })
    .catch(error => {
      console.error('Error:', error);
    });
    return moviname
}

 const scrap_movie_info = async (movie_name) => {
  const url = `https://www.rottentomatoes.com/m/${movie_name}`;
  let movieInfo = {}
  await axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      
      $('section#movie-info').find('div.media-body').find('div.panel-body').find('ul#info').find('li.info-item').each((index, element) => {
        const label = $(element).find('b.info-item-label').text().trim();
        const value = $(element).find('span.genre, span, a, span.runtime, span.distributor, span.production-co, span.aspect-ratio').first().text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
        movieInfo[label]=value;
      });

    })
    .catch(error => {
      console.error('Error:', error);
    });
    return movieInfo
}

 const scrap_synopsis = async (movie_name) => {
  const url = `https://www.rottentomatoes.com/m/${movie_name}`;

  let synop = ""
  await axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const synopsis = $('p[data-qa="movie-info-synopsis"]').text().trim()
      synop=synopsis
    })
    .catch(error => {
      console.error('Error:', error);
    });
    return synop;
}

 const scrap_cast_and_crew = async (movie_name) => {
  const url = `https://www.rottentomatoes.com/m/${movie_name}`;
  let castCrew=[];
  await axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      $('section#cast-and-crew .cast-and-crew-item').each((index, element) => {
        const actorName = $('a', element).text().trim();
        const characterName = $('p[class="p--small"]', element).text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
        const imageUrl = $('img', element).attr('src');
        castCrew.push({ actorName, characterName, imageUrl });
      });
      // console.log(castCrew);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    return castCrew;
}

 const scrap_ott = async (movie_name) => {
  const url = `https://www.rottentomatoes.com/m/${movie_name}`;

  let ottData = [];
  await axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('where-to-watch-meta').each((i, elem) => {
        const ottName = $(elem).find('where-to-watch-bubble').attr('image');
        const ottLink = $(elem).attr('href');

        ottData.push({ ottName, ottLink });
      });
    })

    .catch(error => {
      console.error('Error:', error);
    });
    return ottData;
}

 const scrap_movie_img = async (movie_name) => {
  const url = `https://www.rottentomatoes.com/m/${movie_name}`;

  let mv=""
  await axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      const mv_img = $('tile-dynamic.thumbnail rt-img').attr('src')

      mv=mv_img;
    })

    .catch(error => {
      console.error('Error:', error);
    });
    return mv
}

 const scrap_movie_photos = async (movie_name) => {
  const url = `https://www.rottentomatoes.com/m/${movie_name}`;

  let photos=[]
  await axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);


      $('rt-img').each((index, element) => {
        const photo = $(element).attr('src')
        photos.push(photo)
      });


    })

    .catch(error => {
      console.error('Error:', error);
    });
    return photos
}


module.exports={scrap_cast_and_crew,scrap_movie_img,scrap_movie_name,scrap_movie_photos}