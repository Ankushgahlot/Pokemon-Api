// import React from 'react'
// import { Link } from "react-router-dom"
const Pokemin = ({ name, image }) => {
  return (
    <>
        <div className="flex flex-col items-center mt-10 p-5">
          <img
            className="w-60 h-60"
            src={image}
            alt="" />
          <p className="font-semibold text-2xl ">{name}</p>

        </div>
    </>
  )
}

export default Pokemin
