import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RequestService from './../../services/httpRequestService';

export default function HeroDetail() {
    const { id } = useParams();
    const [hero, setHero] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        RequestService.getHero(id)
            .then(result => {
                setHero(result);
                setLoading(false);
            });
    }, [id])

    const backgroundStyle = {
        backgroundImage: "url(/images/background-detail.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center"
    }

    if(loading)
        return (
            <div className="mt-5">
                <div className="spinner-border"></div>
            </div>
        )
    else
        return (
            <div className="d-flex align-items-stretch rounded shadow" style={backgroundStyle}>
                <img className="rounded p-1" width="40%" src={hero.image} alt="Superhero" />
                <ul className="text-left p-3 d-flex flex-column justify-content-around">
                    <li><strong>Nombre: </strong>{hero.name}</li>
                    <li><strong>Alias: </strong>{hero.aliases.join(', ')}</li>
                    <li><strong>Lugar de trabajo: </strong>{hero.workplace}</li>
                    <li><strong>Altura: </strong>{hero.height}</li>
                    <li><strong>Peso: </strong>{hero.weight}</li>
                    <li><strong>Color de ojos: </strong>{hero.eyeColor}</li>
                    <li><strong>Color de pelo: </strong>{hero.hairColor}</li>
                </ul>
            </div>
        )
}
