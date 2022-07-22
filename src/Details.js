import React,{useState,useEffect,} from 'react'
import {useParams} from "react-router";
import { Link } from 'react-router-dom';
import Loading from './Loading';

const fetchGenerationPokemon = async(id, setArrayOfPokemon, setNameOfGeneration) => {
  try{
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${id}`)
    const {pokemon_species, name} = await response.json()
    setNameOfGeneration(name)
    const pokemonUrls = pokemon_species.map((species) => species.url.replace('pokemon-species', 'pokemon')
    )

    const allPokemon = await Promise.all(pokemonUrls.map(async(url) => {
      const data = await fetch(url)
      const { name, sprites: { back_default } } = await data.json()
      return { name, back_default } 
    }) )
    setArrayOfPokemon(allPokemon)
  } catch (error){
    console.log(error)
  } 
}

function Details() {
  const [generation, setGeneration] = useState([])
  const [name, setName] = useState([])
  const {id} = useParams()

  useEffect(() => {
    fetchGenerationPokemon(id, setGeneration, setName) 
  }, [id])
  if(!generation.length) return <Loading />

  
  return (
    <section>
        <div className='content'>
            <h1 className='title'>{name}</h1>
            <Link to='/' className='return'>return</Link>
        </div>  
        <ul>
        {generation.map((pokemon)=> {
            return(  
            <li key={pokemon.name}>
            <figure>
                <img src={pokemon.back_default} alt={pokemon.name}/>
                <figcaption>{pokemon.name}</figcaption>
            </figure>
            </li> )
        })}
        </ul>
    </section>
  )
}

export default Details