export const MovieCard = ({ image, name }) => {
    return (
      <div className="max-w-[10vw] rounded-2xl min-h-[30vh] bg-[rgba(0,0,0,0.65)] flex flex-col justify-center items-center">
        <img src={image} alt="" className="w-[10vw] rounded-t-2xl" />
        <span className="text-xl text-center py-3 px-2 text-white">
          {name}
        </span>
      </div>
    )
  }