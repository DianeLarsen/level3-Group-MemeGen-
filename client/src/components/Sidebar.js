import React from "react";
import './list.css'

export default function Sidebar(props) {
  //moved from Form
  const [saveChanges, setSaveChanges] = React.useState(false);
    
  const [editIndex, setEditIndex] = React.useState(0);
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
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }
  function saveEditedMeme(i) {
    let tempArr = [...saved];

    tempArr[i].topText = props.meme.topText;
    tempArr[i].bottomText = props.meme.bottomText;
    tempArr[i].memeImg = props.meme.memeImg;

    setSaved(tempArr);

    saveChanges ? setSaveChanges(false) : "";
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

    console.log(saved);
  }
  return (
    <div className="sidebar">
      <span className="savedlist">Saved Memes</span>
      <span className="subText">click to edit</span>
      {saved.map((item, index) => {
        if (index !== 0) {
          return (
            <div key={index} className="mini-meme">
              <div
                className="delete"
                onClick={() => {
                  setSaved(saved.filter((i) => i.uuid !== item.uuid));

                  setSaveChanges(false);
                  console.log("Delete");
                }}
              >
                X
              </div>
              <img
                onClick={() => {
                  props.setMeme({
                    topText: item.topText,
                    bottomText: item.bottomText,
                    memeImg: item.memeImg,
                  });

                  setSaveChanges(true);
                  setEditIndex(index);
                  console.log("Editing: ", index);
                }}
                className="mini-meme-image"
                src={item.memeImg}
              />
              <h2 className="mini-meme--text mini-top">{item.topText}</h2>
              <h2 className="mini-meme--text mini-bottom">{item.bottomText}</h2>
            </div>
          );
        }
      })}
      <button
                className="saveButton"
                onClick={() => {
                    addMemeToList(props.meme.topText, props.meme.bottomText, props.meme.memeImg);
                    setSaveChanges(false);
                    props.setMeme(prev => ({
                        ...prev,
                        topText: "",
                        bottomText: ""
                    }))
                }}
            >+ Add to list
            </button>
            {saveChanges && <button
                onClick={() => {
                saveEditedMeme(editIndex)
                props.setMeme(prev => ({
                    ...prev,
                    topText: "",
                    bottomText: ""
                }))}}
                className="editButton">Save changes</button>}
            {saveChanges && <button
                onClick={() => {
                    setSaveChanges(false)
                    props.setMeme(prev => ({
                        ...prev,
                        topText: "",
                        bottomText: ""
                    }))
                }}
                className="cancelButton">Cancel</button>}
    </div>
  );
}
