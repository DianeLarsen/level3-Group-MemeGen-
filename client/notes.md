Tasks
--state is in Meme, might need to rearrange and put it into App.js--
--or we could make <MemeList /> be a child of <Meme />
-create save button next to get meme button
    <button onClick={onSave}>Save</button>

-Create Sidebar to display component

-Create MemeList component
<MemeList savedImage={randomImage} topText={topText} bottomText={bottomText} handleEdit={onEdit} handleDelete={onDelete}/>
    -component will be a list of created Memes
        
        export default function MemeList(props) {

            return (
                <div className="memelist">
                    <img src={props.randomImage} className="meme--image" alt="meme" />
                    <h2 className="meme--text top">{props.topText}</h2>
                    <h2 className="meme--text bottom">{props.bottomText}</h2>
                    <button className="editBtn" onClick={props.onEdit}> edit </button>
                    <button className="deleteBtn" onClick={props.onDelete}> delete </button>
                </div>
            )
         }   
    -each created/saved meme will have an edit button and a delete button

-do we want to clear the input fields once the meme has been saved?


some functions to consider
const [memeList, setMemeList] = React.useState({
     topText: "",
        bottomText: "",
        randomImage: ""
})
function onSave (){
    const newMeme = {
        topText: props.topText,
        bottomText: props.bottomText,
        randomImage: props.randomImage
    }
    setMemeList((prevMeme) => [...prevData, newMeme]);

}
function onEdit (){

}
function onDelete (){

}
