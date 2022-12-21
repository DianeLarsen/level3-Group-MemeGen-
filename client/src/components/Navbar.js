import React from "react"
import troll from "../assets/troll-face.png"
import './nav.css'

export default function Header() {
    return (
        <nav>
            <img 
                src={troll} 
                alt="troll"
            />
            <h1 >Meme Generator</h1>
            <p >React Course - Project 3</p>
        </nav>
    )
}