import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./list.css";
import "./form.css";

export default function Meme() {
  //same
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    memeImg: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = React.useState([]);
  const [saveChanges, setSaveChanges] = React.useState(false);
  const [saved, setSaved] = React.useState([
    {
      uuid: 0,
      topText: "",
      bottomText: "",
      memeImg: "",
    },
  ]);
  function create_UUID() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }
  function addMemeToList(topText, bottomText, url) {
    let tempID = create_UUID();

    const tempMeme = {
      uuid: tempID,
      topText: topText,
      bottomText: bottomText,
      memeImg: url,
    };

    setSaved((prev) => [...prev, tempMeme]);
 
    
  }
  //moved following to Sidebar.js
  // const [editIndex, setEditIndex] = React.useState(0);

  //same
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  // moved to Sidebar.js

  // function saveEditedMeme(i) {
  //         let tempArr = [...saved];

  //         tempArr[i].topText = meme.topText;
  //         tempArr[i].bottomText = meme.bottomText;
  //         tempArr[i].memeImg = meme.memeImg;

  //         setSaved(tempArr);

  //         saveChanges ? setSaveChanges(false) : '';
  //     }

  //called randomMeme on Mike's
  function getMemeImage(e) {
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      memeImg: url,
    }));
  }
  //created function to clear once certain buttons clicked
  function clearInput() {
    setMeme((prevMeme) => ({
      ...prevMeme,
      topText: "",
      bottomText: "",
    }));
  }
  //same
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <div className="screen">
      {saved[1] && <Sidebar
        topText={meme.topText}
        bottomText={meme.bottomText}
        memeImage={meme.memeImg}
        setMeme={setMeme}
        clearInput={clearInput}
        saved={saved}
        setSaved={setSaved}
        saveChanges={saveChanges}
        setSaveChanges={setSaveChanges}
     
      />}

      <br />
      

      <div className="meme-container">
        <Navbar />
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
          <div className="cntBtns">
            <button id="meme-button" className="submit">
              Get new image 🖼
            </button>
            <button
              className="saveButton"
              id="saveBtn"
              onClick={() => {
                addMemeToList(meme.topText, meme.bottomText, meme.memeImg);
                console.log(meme.memeImg);
                setSaveChanges(false);
                clearInput();
              }}
            >
              + Add to list
            </button>
          </div>
          <div className="meme">
            <img className="meme-image" src={meme.memeImg} alt="meme" />
            <h2 className="meme--text top">{meme.topText}</h2>
            <h2 className="meme--text bottom">{meme.bottomText}</h2>
          </div>
        </form>
   
      </div>
    </div>
  );
}
