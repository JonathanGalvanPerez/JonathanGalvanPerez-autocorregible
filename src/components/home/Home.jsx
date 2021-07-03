import React from 'react'
import { useSelector } from 'react-redux';
import TeamStats from './TeamStats';
import StatsCard from './../statsCard/StatsCard';

export default function Home() {
    const team = useSelector(state => state.team.heroes);
    console.log('Team: ', team);
    return (
        <div>
            <h2 className="jumbotron m-0">Tu equipo de superheroes</h2>
            <div className="d-flex flex-nowrap overflow-auto scrollable">
                {team.length === 0 ?
                    <h5 className="mx-auto my-4">No hay ningun superheroe en su equipo</h5>
                :
                    team.map(hero => (
                        <StatsCard hero={hero} key={hero.id} />
                    ))
                }
            </div>
            <TeamStats />
        </div>
    )
}
