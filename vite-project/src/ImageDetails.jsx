import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function ImageDetails() {
    const [found, setfound] = useState(false)
    const [Result, setResults] = useState([])
    const { id } = useParams();
    async function Download() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        console.log(response.data);
        const typesArry = response.data.types
        let type1 = "Not Another Type";
        let type2 = "Not Another Type";
        if (typesArry && typesArry.length > 0) {
            type1 = typesArry[0].type.name;
            if (typesArry.length > 1) {
                type2 = typesArry[1].type.name;
            }
        }
        setResults({
            id: response.data.id,
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            type1: type1,
            type2: type2
        });
    }
    useEffect(() => {
        Download()
    }, [])
    return (
        <>
            <div className="bg-red-950 flex justify-between items-center w-[100%]  fixed top-0 pt-1 pb-1 pl-5 pr-5">
                <h1 className="text-slate-300 text-2xl font-semibold mb-5 mt-2">
                    Pokemons
                </h1>
            </div>
            <div className="flex flex-col items-center gap-2 mt-24">
                <img className="h-60 w-60" src={Result.image} alt="" />
                <div> <span className="font-bold">ID: </span>{Result.id}</div>
                <div><span className="font-bold">Name: </span>{Result.name}</div>
                <div><span className="font-bold">Weight: </span>{Result.weight}</div>
                <div><span className="font-bold">Height: </span>{Result.height}</div>
                <div><span className="font-bold">Types: </span>{Result.type1},{Result.type2}</div>
            </div>
        </>
    )
}
export default ImageDetails;