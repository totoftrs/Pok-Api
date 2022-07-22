import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

function Generation() {
    const [data, setData] = useState()
    const fetchData = async() => {
        try{
            const response = await fetch('https://pokeapi.co/api/v2/generation')
            const generation = await response.json()
            setData(generation)
        }catch(error){
            console.log(error)
        } 
    }
    useEffect(()=>{
        fetchData()
    },[])

  return (
    <section >
        <h2>Generation</h2>
        <div className='container'>
            {data?.results?.map((element, index) => { 
            return <div key={element.name} className='generation'>
                <Link to={ `/generation/${index + 1}` } className='link'>{element.name}</Link>
                </div> })}
        </div>
      

    </section>
  )
}

export default Generation