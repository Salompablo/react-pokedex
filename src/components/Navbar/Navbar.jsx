import React from 'react'
import './_navbar.scss'

export default function Navbar() {

    let imgUrl = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";

return (
    <nav>
        <div>
        <img src={imgUrl} alt="pokeapi-logo" className="navbar-image" />
    </div>
    </nav>
)
}
