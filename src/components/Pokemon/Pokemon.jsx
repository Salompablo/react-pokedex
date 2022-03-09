import React from 'react'

export default function Pokemon(props) {
    const { pokemon } = props;
    
    return (
    <div className='pokemon-card'>
        <div className='pokemon-img'>
            <img src={pokemon.srpites.front_default}
            alt={pokemon.name} />
        </div>
        <div>
            <div>
                <h3>{pokemon.name}</h3>
                <div>#{pokemon.id}</div>
            </div>
            <div>
                <div>
                    {pokemon.types.map((type, id) => {
                        return (
                            <div key={id}>{type.name}</div>
                        )
                    })}
                </div>
                <div>heart</div>
            </div>
        </div>
    </div>
)
}
