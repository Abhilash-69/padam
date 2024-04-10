import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Movie = () => {
    const { movie_name } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [ottData, setottData] = useState([]);
    const [castData, setcastData] = useState([]);
    const [imgData, setimgData] = useState([]);
    // const [review, setReview] = useState("");
    // const [reviews,setReviews] = useState([])
    // const [s,setS] = useState(a);
    useEffect(() => {
        setMovieData(null);
        axios.get(`http://127.0.0.1:8000/api/m/${movie_name}`).then((res) => {
            console.log(res.data);
            setMovieData(res.data);
        })
        axios.get(`http://127.0.0.1:8000/api/ott/${movie_name}`).then((ottRes) => {
            console.log(ottRes.data);
            setottData(ottRes.data);
        });
        axios.get(`http://127.0.0.1:8000/api/cast/${movie_name}`).then((castRes) => {
            console.log(castRes.data);
            setcastData(castRes.data);
        });
        axios.get(`http://127.0.0.1:8000/api/photos/${movie_name}`).then((imgRes) => {
            console.log(imgRes.data);
            setimgData(imgRes.data);
        });
    }, [movie_name]);
    return (
        movieData != null ?
            <main>
                <main className='text-white bg-[rgba(0,0,0,0.9)]'>
                    <section className="flex px-16">
                        <div className="">
                            <img src={movieData.poster} alt="" className="fixed rounded-[20px] ml-[130px] mt-[60px] w-[300px] h-[425px] top-10" />
                        </div>
                    </section>
                    {ottData.length != null ? (
                        <section className="px-16">
                            <h1 className="fixed text-2xl ml-[130px] mt-[540px] mx-16 px-2 border-l-4 italic font-bold border-red-700">
                                Where to Watch
                            </h1>
                            <ul className="flex fixed mt-[590px] ml-[160px] gap-x-4">
                                {ottData.map((val, ind) => (
                                    val.o_name === "netflix" ? (
                                        <li key={ind} className=" w-[60px]">
                                            <a href={val.o_link}>
                                                <img src="https://a.ltrbxd.com/sm/upload/pz/tl/w6/3i/netflix.png?k=2481975daa" alt="" className="w-[60px] h-[60px] p-2 bg-white rounded-[50%]" />
                                            </a>
                                        </li>
                                    ) : (val.o_name === "amazon-prime-video-us" ? (
                                        <li key={ind} className=" w-[60px]">
                                            <a href={val.o_link}>
                                                <img src="https://images.justwatch.com/icon/52449861/s100" alt="" className="w-[60px] h-[60px] p-2 bg-white rounded-[50%]" />
                                            </a>
                                        </li>
                                    ) : (val.o_name === "apple-tv-us" ? (
                                        <li key={ind} className=" w-[60px]">
                                            <a href={val.o_link}>
                                                <img src="https://a.ltrbxd.com/sm/upload/ns/gr/j0/0w/apple-tv.png?k=dd46c8bed7" alt="" className="w-[60px] h-[60px] p-2 bg-white rounded-[50%]" />
                                            </a>
                                        </li>)
                                        // : (val.o_name === "vudu" ? (
                                        //     <li key={ind} className=" w-[60px]">
                                        //         <a href={val.o_link}>
                                        //             <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Vudu_2014_logo.svg" alt="" className="w-[60px] h-[60px] p-2 bg-white rounded-[50%]" />
                                        //         </a>
                                        //     </li>)
                                        : (val.o_name === "disney-plus-us" ? (
                                            <li key={ind} className=" w-[60px]">
                                                <a href={val.o_link}>
                                                    <img src="https://images.justwatch.com/icon/240029443/s100" alt="" className="w-[60px] h-[60px] p-2 bg-white rounded-[50%]" />
                                                </a>
                                            </li>
                                        ) : (val.o_name === "apple-tv-us" ? (
                                            <li key={ind} className=" w-[60px]">
                                                <a href={val.o_link}>
                                                    <img src="https://a.ltrbxd.com/sm/upload/ns/gr/j0/0w/apple-tv.png?k=dd46c8bed7" alt="" className="w-[60px] h-[60px] p-2 bg-white rounded-[50%]" />
                                                </a>
                                            </li>
                                        ) : null
                                        ))))))}
                            </ul>
                        </section>
                    ) : null}
                    <section className="pb-16 pt-16 px-20 mt-[30px] mr-[100px]">
                        <div className="flex flex-col ml-[600px] gap-y-4 ">
                            <h1 className="font-bold text-3xl ">
                                {movieData.m_name}                        </h1>
                            <strong className="text-2xl   px-2 border-l-4 italic font-bold border-red-700">
                                Synopsis
                            </strong>
                            <span className="mx-4">
                                {movieData.synopsis}
                            </span>
                        </div>
                        <section>
                            <h1 className="text-2xl ml-[600px] mt-12 mx-16  px-2 border-l-4 italic font-bold border-red-700">
                                Details
                            </h1>
                            <div className="pt-8 px-20">
                                <ul className="flex flex-col ml-[540px] gap-y-1">
                                    {movieData["director"] != null ?
                                        <li>
                                            <strong>Director :</strong> {movieData["director"]}
                                        </li> : null
                                    }

                                    {movieData["distributor"] != null ?
                                        <li>
                                            <strong>Distributor : </strong> {movieData["distributor"]}
                                        </li> : null
                                    }

                                    {movieData["genre"] != null ?
                                        <li>
                                            <strong>Genre: </strong> {movieData["genre"]}
                                        </li> : null
                                    }

                                    {movieData["original_language"] != null ?
                                        <li>
                                            <strong>Original Language: </strong> {movieData["original_language"]}
                                        </li> : null
                                    }

                                    {movieData["producer"] != null ?
                                        <li>
                                            <strong>Producer: </strong> {movieData["producer"]}
                                        </li> : null
                                    }

                                    {movieData["production_co"] != null ?
                                        <li>
                                            <strong>Production Co: </strong> {movieData["production_co"]}
                                        </li> : null
                                    }
                                    {movieData["release_date"] != null ?
                                        <li>
                                            <strong>Release Date (Theaters): </strong> {movieData["release_date"]}
                                        </li> : null
                                    }
                                    {movieData["runtime"] != null ?
                                        <li>
                                            <strong>Runtime </strong> {movieData["runtime"]}
                                        </li> : null
                                    }
                                    {movieData["writer"] != null ?
                                        <li>
                                            <strong>Writer: </strong> {movieData["writer"]}
                                        </li> : null
                                    }

                                </ul>
                            </div>
                            {castData.length != 0 ? (
                                <section>
                                    <h1 className="text-2xl ml-[600px] mt-12 mx-16  px-2 border-l-4 italic font-bold border-red-700">
                                        Cast & Crew
                                    </h1>
                                    <div className="pt-8">
                                        <ul className="ml-[640px] mx-29 flex flex-1 overflow-auto gap-x-4">

                                            {castData.map((val, ind) => (
                                                <li id={ind} className="">
                                                    <div>
                                                        <img src={val.c_link} alt="" id={ind} className="min-w-[150px] max-w-[150px]" />
                                                        <label htmlFor={ind} className="text-xl">{val.c_name}</label>
                                                    </div>
                                                    <span className="text-red-700">
                                                        {val.c_role}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </section>
                            ) : null}

                            {imgData.length != null ? (
                                <section>
                                    <h1 className="text-2xl ml-[600px] mt-12 mx-16  px-2 border-l-4 italic font-bold border-red-700">
                                        {movieData.m_name} photos
                                    </h1>
                                    <div className="pt-8">
                                        <ul className="ml-[640px] mx-29 flex flex-1 overflow-auto gap-x-4">

                                            {imgData.map((val, ind) => (
                                                <li id={ind} className="flex items-center">
                                                    <div>
                                                        <img src={val.m_image} alt="" id={ind} className="min-w-[150px] max-w-[150px]" />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </section>
                            ) : null}
                        </section>
                    </section>

                </main>
            </main> : null
    )
}
