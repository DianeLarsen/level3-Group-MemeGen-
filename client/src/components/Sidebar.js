import React from "react";
import "./list.css";

export default function Sidebar(props) {
  const [editIndex, setEditIndex] = React.useState(0);
  // cosnt [editSave, setEditSave] = 

  function saveEditedMeme(i) {
    let tempArr = [...props.saved];
  
   
    tempArr[i].topText = props.topText;
    tempArr[i].bottomText = props.bottomText;
    tempArr[i].memeImg = props.memeImage;
   
    props.setSaved(tempArr);

    return props.saveChanges ? props.setSaveChanges(false) : "";
  }

  return (
    
      <div className="sidebar">
        <span className="savedlist">Saved Memes</span>
        <span className="subText">click image to edit</span>
        <div className="modBtns">
          {props.saveChanges && (
            <button
              onClick={() => {
                saveEditedMeme(editIndex);
                props.clearInput();
              }}
              className="editButton"
            >
              Save changes
            </button>
          )}
          {props.saveChanges && (
            <button
              onClick={() => {
                props.setSaveChanges(false);
                props.clearInput();
                // props.setMeme(prev => ({
                //     ...prev,
                //     topText: "",
                //     bottomText: ""
                // }))
              }}
              className="cancelButton"
            >
              Cancel
            </button>
          )}
        </div>
        {props.saved.map((item, index) => {
          if (index !== 0) {
            return (
              <div key={index} className="mini-meme">
                <div
                  className="delete"
                  onClick={() => {
                    props.setSaved(
                      props.saved.filter((i) => i.uuid !== item.uuid)
                    );

                    props.setSaveChanges(false);
                    console.log("Delete");
                  }}
                >
                  X
                </div>
                <img
                  alt="meme"
                  onClick={() => {
                    props.setMeme({
                      topText: item.topText,
                      bottomText: item.bottomText,
                      memeImg: item.memeImg,
                    });

                    props.setSaveChanges(true);
                    setEditIndex(index);
                    console.log("Editing: ", index);
                  }}
                  className="mini-meme-image"
                  src={item.memeImg}
                />
                <h2 className="mini-meme--text mini-top">{item.topText}</h2>
                <h2 className="mini-meme--text mini-bottom">
                  {item.bottomText}
                </h2>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    
  );
}
