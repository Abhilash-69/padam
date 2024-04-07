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
        const label = $(element).find('b.info-item-label').text().trim().replace(/:/g, "");
        const value = $(element).find('span.genre, span, a, span.runtime, span.distributor, span.production-co, span.aspect-ratio').first().text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
        if(label === 'Original Language'){
            movieInfo['Original_Language']=value
        }
        else if(label === 'Release Date (Theaters)'){
            movieInfo['Release_Date']=value
        }
        else if(label === 'Production Co'){
          movieInfo['Production_Co']=value
        }
        else if(label === 'Aspect Ratio'){
          movieInfo['Aspect_Ratio']=value
        }
        else{
            movieInfo[label]=value;
        }
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
        let imageUrl = $('img', element).attr('src');
        imageUrl = imageUrl.substring(70);
        castCrew.push({actorName,characterName,imageUrl});
      });

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

      let mv_img = $('tile-dynamic.thumbnail rt-img').attr('src')
      mv_img = mv_img.substring(70)
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


      $('section#photos-module').find('rt-img').each((index, element) => {
        let photo = $(element).attr('src')
        photo = photo.substring(70)
        photos.push({photo})
        
      });
      console.log(photos)
    })

    .catch(error => {
      console.error('Error:', error);
    });
    return photos
}

const scrap_search = async (movie_name) => {
  const url = `https://www.rottentomatoes.com/search?search=${movie_name}`;

  let search=[]
  await axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      const movieResults = $('search-page-result[type="movie"]');

      movieResults.find('search-page-media-row').each((index, element) => {
        const movieTitle = $('a[slot="title"]',element).text().trim();
        let movieLink = $('a', element).attr('href');
        if(movieLink.match('https:\/\/www\.rottentomatoes\.com\/m\/.*')){
          movieLink = movieLink.substring(33)
        }
        let movieImage = $('img', element).attr('src');
        movieImage = movieImage.substring(76)
        search.push({ movieTitle, movieLink, movieImage });
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
    return search;
}

scrap_movie_photos('leo_2023_2')
// scrap_movie_info('leo_2023_2')
module.exports={scrap_search,scrap_movie_info,scrap_synopsis,scrap_cast_and_crew,scrap_movie_img,scrap_movie_name,scrap_movie_photos,scrap_ott}