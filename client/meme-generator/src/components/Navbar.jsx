import icon from '../assets/nav-icon.png'
import './nav.css'

function Navbar() {
    return(
        <nav>
            <img src={icon} />
            <h1>Meme Generator</h1>
            <p>React Course - Project 3</p>
        </nav>
    )
}

export default Navbar