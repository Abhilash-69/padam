import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

export const Movie = () => {
    const { movie_name } = useParams();
    const [movieData, setMovieData] = useState(null);
    // const [review, setReview] = useState("");
    // const [reviews,setReviews] = useState([])
    // const [s,setS] = useState(a);
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/movie/${movie_name}`).then((res) => {
            console.log(res.data);
            setMovieData(res.data);
        })
    }, [movie_name]);
    return (
        movieData != null ?
            <main className=' text-white bg-[rgba(0,0,0,0.9)] min-h-screen px-16 pb-16'>
                <section className="flex w-[75%] pt-16 px-12 gap-x-12">
                    <div className="">
                        <img src={movieData.mv} alt="" className="min-w-[200px]" />
                    </div>
                    <div className="flex flex-col gap-y-4">
                        <h1 className="font-bold text-3xl ">
                            {movieData.moviname}                        </h1>
                        <strong className="text-2xl   px-2 border-l-4 italic font-bold border-red-700">
                            Synopsis
                        </strong>
                        <span className="mx-4">
                            {movieData.synop}
                        </span>
                    </div>
                </section>
                <section>
                    <h1 className="text-2xl mt-12 mx-16  px-2 border-l-4 italic font-bold border-red-700">
                        Details
                    </h1>
                    <div className="pt-8 px-20">
                        <ul className="flex flex-col gap-y-1">
                            {movieData["Director"] != null ?
                                <li>
                                    <strong>Director :</strong> {movieData["Director"]}
                                </li> : null
                            }

                            {movieData["Distributor"] != null ?
                                <li>
                                    <strong>Distributor : </strong> {movieData["Distributor"]}
                                </li> : null
                            }

                            {movieData["Genre"] != null ?
                                <li>
                                    <strong>Genre: </strong> {movieData["Genre"]}
                                </li> : null
                            }

                            {movieData["Original_Language"] != null ?
                                <li>
                                    <strong>Original Language: </strong> {movieData["Original_Language"]}
                                </li> : null
                            }

                            {movieData["Producer"] != null ?
                                <li>
                                    <strong>Producer: </strong> {movieData["Producer"]}
                                </li> : null
                            }

                            {movieData["Production_Co"] != null ?
                                <li>
                                    <strong>Production Co: </strong> {movieData["Production_Co"]}
                                </li> : null
                            }
                            {movieData["Release_Date"] != null ?
                                <li>
                                    <strong>Release Date (Theaters): </strong> {movieData["Release_Date"]}
                                </li> : null
                            }
                            {movieData["Runtime"] != null ?
                                <li>
                                    <strong>Runtime </strong> {movieData["Runtime"]}
                                </li> : null
                            }
                            {movieData["Writer"] != null ?
                                <li>
                                    <strong>Writer: </strong> {movieData["Writer"]}
                                </li> : null
                            }

                        </ul>
                    </div>
                </section>
                {movieData["where-to-watch"].length != 0 ?
                    <section>
                        <h1 className="text-2xl mt-12 mx-16  px-2 border-l-4 italic font-bold border-red-700">
                            Where to Watch
                        </h1>
                        <ul className="mx-16 pt-12 px-12 flex gap-x-4">
                            {movieData["ottData"].map((val, ind) => (
                                val.ottName === "netflix" ?
                                    <li className=" w-[60px]">
                                        <a href={val.ottLink}>
                                            <img src={netflix} alt="" className="w-[60px] h-[60px] p-2 bg-white rounded-[50%]" />
                                        </a>
                                    </li> : val.ottName === "amazon-prime-video-us" ? <li className=" w-[60px]">
                                        <a href={val.ottLink}>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg" alt="" className="w-[60px] h-[60px] p-2 bg-white rounded-[50%]" />
                                        </a>
                                    </li> : val.ottName === "apple-tv-us" ? <li className=" w-[60px]">
                                        <a href={val.ottLink}>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg" alt="" className="w-[60px] h-[60px] p-2 bg-white rounded-[50%]" />
                                        </a>
                                    </li> : val.ottName === "vudu" ? <li className=" w-[60px]">
                                        <a href={val.ottLink}>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Vudu_2014_logo.svg" alt="" className="w-[60px] h-[60px] p-2 bg-white rounded-[50%]" />
                                        </a>
                                    </li> : val.ottName === "disney-plus-us" ? <li className=" w-[60px]">
                                        <a href={val.ottLink}>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" alt="" className="w-[60px] h-[60px] p-2 bg-white rounded-[50%]" />
                                        </a>
                                    </li> : val.ottName === "apple-tv-us" ? <li className=" w-[60px]">
                                        <a href={val.ottLink}>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg" alt="" className="w-[60px] h-[60px] p-2 bg-white rounded-[50%]" />
                                        </a>
                                    </li> : null
                            ))}
                        </ul>
                    </section> : null}

                <section>
                    <h1 className="text-2xl mt-12 mx-16  px-2 border-l-4 italic font-bold border-red-700">
                        Cast & Crew
                    </h1>
                    <div className="pt-8">
                        <ul className="mx-24 flex flex-1 overflow-auto gap-x-4">

                            {movieData["castCrew"].map((val, ind) => (
                                <li className="">
                                    <div>
                                        <img src={val.actorName} alt="" id={ind} className="min-w-[150px] max-w-[150px]" />
                                        <label htmlFor={ind} className="text-xl">{val.actorName}</label>
                                    </div>
                                    <span className="text-red-700">
                                        {val.characterName}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section>
                    <h1 className="text-2xl mt-12 mx-16  px-2 border-l-4 italic font-bold border-red-700">
                        {movieData.moviname} photos
                    </h1>
                    <div className="pt-8">
                        <ul className="mx-24 flex flex-1 overflow-auto gap-x-4">

                            {movieData["photos"].map((val, ind) => (
                                <li className="flex items-center">
                                    <div>
                                        <img src={photos.photo} alt="" id={ind} className="min-w-[150px] max-w-[150px]" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>




            </main> : null
    )
}
