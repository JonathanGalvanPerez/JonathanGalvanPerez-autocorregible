import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addHero } from '../../features/team/teamSlice';

export default function HeroCard({ hero, included }) {
    const dispatch = useDispatch();
    const [added, setAdded] = useState(included);
    const addButtonhandler = () => {
        if(!added){
            dispatch(addHero(hero));
            setAdded(true);
        }
    }

    const imageStyle = {
        height: "320px",
        objectFit: "cover"
    }

    return (
        <div className="col p-1">
            <div className="alkemy-card rounded-xs overflow-hidden">
                <img className="card-img-top" src={hero.image.url} alt="Superhero" style={imageStyle} />
                <div className="card-body">
                    <h5 className="card-title">{hero.name}</h5>
                    <button onClick={addButtonhandler} className="alkemy-btn-primary">
                        { added ? "Agregado" : "Agregar" }
                    </button>
                </div>
            </div>
        </div>
    )
}
