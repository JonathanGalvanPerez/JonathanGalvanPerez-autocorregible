import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteHero } from '../../features/team/teamSlice'
import Alert from '../../services/alertService';
import { Link } from 'react-router-dom';
import ProgressBar from '../utils/ProgressBar';

export default function StatsCard({ hero }) {
    const dispatch = useDispatch();

    const deleteButtonHandler = () => {
        dispatch(deleteHero(hero.id));
        Alert.success('Listo', 'Se ha eliminido al superheroe de su equipo')
    }

    const imageStyle = {
        height: "320px",
        objectFit: "cover"
    }

    return (
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 p-1">
            <div className="alkemy-card rounded-lg overflow-hidden">
                <img className="card-img-top" src={hero.image.url} alt="Superheroe" style={imageStyle} />
                <div className="card-body py-2">
                    <h5 className="card-title m-0">{hero.name}</h5>
                    <ul className="card-text my-2">
                        {Object.keys(hero.powerstats).map((key) => (
                            <li key={key}><strong>{key}</strong>: 
                                <div className="progress" style={{height: "12px"}}>
                                    <ProgressBar value={hero.powerstats[key]} />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Link as="button" to={`/hero/${hero.id}`} className="alkemy-btn-success mr-2">Detalles</Link>
                    <button onClick={deleteButtonHandler} className="alkemy-btn-danger">Eliminar</button>
                </div>
            </div>
        </div>
    )
}
