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

 const scrap_movie_info = (movie_name) => {
  const url = `https://www.rottentomatoes.com/m/${movie_name}`;

  axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const movieInfo = {}

      $('section#movie-info').find('div.media-body').find('div.panel-body').find('ul#info').find('li.info-item').each((index, element) => {
        const label = $(element).find('b.info-item-label').text().trim();
        const value = $(element).find('span.genre, span, a, span.runtime, span.distributor, span.production-co, span.aspect-ratio').first().text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
        movieInfo[label] = value;
      });

      return movieInfo
    })
    .catch(error => {
      console.error('Error:', error);
    });

}

 const scrap_synopsis = (movie_name) => {
  const url = `https://www.rottentomatoes.com/m/${movie_name}`;

  axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const synopsis = $('p[data-qa="movie-info-synopsis"]').text().trim()

      return synopsis;
    })
    .catch(error => {
      console.error('Error:', error);
    });

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

 const scrap_ott = (movie_name) => {
  const url = `https://www.rottentomatoes.com/m/${movie_name}`;

  axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      const ottData = [];

      $('where-to-watch-meta').each((i, elem) => {
        const ottName = $(elem).find('where-to-watch-bubble').attr('image');
        const ottLink = $(elem).attr('href');

        ottData.push({ ottName, ottLink });
      });

      return ottData;
    })

    .catch(error => {
      console.error('Error:', error);
    });

}

 const scrap_movie_img = (movie_name) => {
  const url = `https://www.rottentomatoes.com/m/${movie_name}`;

  axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      const mv_img = $('tile-dynamic.thumbnail rt-img').attr('src')

      return mv_img;
    })

    .catch(error => {
      console.error('Error:', error);
    });

}

 const scrap_movie_photos = (movie_name) => {
  const url = `https://www.rottentomatoes.com/m/${movie_name}`;

  axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      const photos = []

      $('rt-img').each((index, element) => {
        const photo = $(element).attr('src')
        photos.push(photo)
      });

      return photos

    })

    .catch(error => {
      console.error('Error:', error);
    });
}

// scrap_movie_info('leo_2023_2')

module.exports={scrap_cast_and_crew,scrap_movie_img,scrap_movie_name,scrap_movie_photos}