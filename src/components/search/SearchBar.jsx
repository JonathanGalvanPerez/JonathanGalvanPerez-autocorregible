import React, { useState } from 'react'
import RequestService from './../../services/httpRequestService';
import Alert from './../../services/alertService';

export default function SearchBar({ onSearch, setLoading }) {
    const [query, setQuery] = useState('');
    const searchButtonHandler = async () => {
        setLoading(true);
        const result = await RequestService.searchHero(query);
        if(!result.error)
            onSearch(result);
        else
            Alert.error('No encontrado!', 'El superheroe que buscas no se encontró en la base de datos');
        setLoading(false);
    }
    const enterPressHandler = (event) => {
        if(event.code === "Enter")
            searchButtonHandler();
    }
    return (
        <div className="input-group border rounded-pill mb-4 col-md-10 col-lg-8 p-0 mx-auto overflow-hidden">
            <input type="search" className="alkemy-form-control pl-4 pr-2" placeholder="Nombre del superheroe"
            value={query} onChange={(event) => setQuery(event.target.value)}
            onKeyUp={enterPressHandler} />
            <div className="input-group-append">
                <button type="button" className="alkemy-btn-success m-0 d-flex align-items-center" onClick={searchButtonHandler} >
                <span className="material-icons">search</span>Buscar</button>
            </div>
        </div>
    )
}
