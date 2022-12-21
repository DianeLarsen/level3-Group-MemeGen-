import React from "react"

import Sidebar from "./Sidebar"
import './list.css'
import './form.css'

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    //called randomMeme on Mike's
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    //created function to clear once certain buttons clicked
    function clearInput(){
        setMeme(prevMeme => ({
            ...prevMeme, topText: "",
        bottomText: ""
        }))
    }
    //same 
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    return (
        <main>
            
            <Sidebar />
            <br />
            {/* <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button> */}
                <div className="meme-container">
       
                <form onSubmit={getMemeImage} name="myform" className="container">
                    <div className="field-container">
                        <input
                            name="topText"
                            type="text"
                            value={meme.topText}
                            onChange={handleChange}
                        />
                        <input
                            name="bottomText"
                            type="text"
                            value={meme.bottomText}
                            onChange={handleChange}
                        />
                    </div>
                    <button id="meme-button" className="submit">Get a new meme image 🖼</button>
                    <div className="meme">
                        <img className="meme-image" src={meme.memeImg} />
                        <h2 className="meme--text top">{meme.topText}</h2>
                        <h2 className="meme--text bottom">{meme.bottomText}</h2>
                    </div>
                </form>
            {/* </div> */}


            </div>
          
        </main>
    )
}