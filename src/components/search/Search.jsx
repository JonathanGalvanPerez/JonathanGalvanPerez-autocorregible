import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import HeroCard from '../heroCard/HeroCard';
import SearchBar from './SearchBar'

export default function Search() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const team = useSelector(state => state.team.heroes);
    console.log('data: ', data);
    return (
        <div>
            <h2 className="jumbotron">Ingrese el nombre del superheroe</h2>
            <SearchBar onSearch={setData} setLoading={setLoading} />
            {loading?
                <div className="spinner-border alkemy-spinner mx-auto mt-5" role="status" aria-hidden="true"></div>
            :
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 no-gutters mx-auto justify-content-center">
                    {data.map(hero => (
                        <HeroCard hero={hero} key={hero.id} included={team.find(item => item.id === hero.id)} />
                    ))}
                </div>
            }
        </div>
    )
}
