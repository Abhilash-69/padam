import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Movie = () => {
    const { movie_name } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [ottData, setottData] = useState(null);
    const [castData, setcastData] = useState(null);
    const [imgData, setimgData] = useState(null);
    // const [review, setReview] = useState("");
    // const [reviews,setReviews] = useState([])
    // const [s,setS] = useState(a);
    useEffect(() => {
        setMovieData(null);
        setottData(null);
        axios.get(`http://127.0.0.1:8000/api/m/${movie_name}`).then((res) => {
            console.log(res.data);
            setMovieData(res.data);
        })
        axios.get(`http://127.0.0.1:8000/api/ott/${movie_name}`).then((ottRes) => {
            console.log(ottRes.data);
            const ottarray = [ottRes.data];
            setottData(ottarray);
        });
        axios.get(`http://127.0.0.1:8000/api/cast/${movie_name}`).then((castRes) => {
            console.log(castRes.data);
            const castarray = [castRes.data];
            console.log(castarray);
            setcastData(castarray);
        });
        axios.get(`http://127.0.0.1:8000/api/photos/${movie_name}`).then((imgRes) => {
            console.log(imgRes.data);
            const imgarray = [imgRes.data];
            setimgData(imgarray);
        });
    }, [movie_name]);
    return (
        movieData != null ?
            <main className=' text-white bg-[rgba(0,0,0,0.9)] min-h-screen px-16 pb-16'>
                <section className="flex w-[75%] pt-16 px-12 gap-x-12">
                    <div className="">
                        <img src={movieData.poster} alt="" className="min-w-[200px]" />
                    </div>
                    <div className="flex flex-col gap-y-4">
                        <h1 className="font-bold text-3xl ">
                            {movieData.m_name}                        </h1>
                        <strong className="text-2xl   px-2 border-l-4 italic font-bold border-red-700">
                            Synopsis
                        </strong>
                        <span className="mx-4">
                            {movieData.synopsis}
                        </span>
                    </div>
                </section>
                <section>
                    <h1 className="text-2xl mt-12 mx-16  px-2 border-l-4 italic font-bold border-red-700">
                        Details
                    </h1>
                    <div className="pt-8 px-20">
                        <ul className="flex flex-col gap-y-1">
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
                </section>
                {Array.isArray(ottData) && ottData != null ? (
                    <section>
                        <h1 className="text-2xl mt-12 mx-16  px-2 border-l-4 italic font-bold border-red-700">
                            Where to Watch
                        </h1>
                        <ul className="mx-16 pt-12 px-12 flex gap-x-4">
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

                {Array.isArray(castData) && castData.length > 0 ? (
                    <section>
                        <h1 className="text-2xl mt-12 mx-16  px-2 border-l-4 italic font-bold border-red-700">
                            Cast & Crew
                        </h1>
                        <div className="pt-8">
                            <ul className="mx-24 flex flex-1 overflow-auto gap-x-4">

                                {castData.map((val, ind) => (
                                    <li className="">
                                        <div>
                                            <img src={val.c_name} alt="" id={ind} className="min-w-[150px] max-w-[150px]" />
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

                {Array.isArray(imgData) ? (
                    <section>
                        <h1 className="text-2xl mt-12 mx-16  px-2 border-l-4 italic font-bold border-red-700">
                            {movieData.m_name} photos
                        </h1>
                        <div className="pt-8">
                            <ul className="mx-24 flex flex-1 overflow-auto gap-x-4">

                                {imgData.map((val, ind) => (
                                    <li className="flex items-center">
                                        <div>
                                            <img src={val.m_image} alt="" id={ind} className="min-w-[150px] max-w-[150px]" />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                ) : null}




            </main> : null
    )
}
