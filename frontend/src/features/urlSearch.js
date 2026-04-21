import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { getOriginalUrl,deleteUrl} from "./urlSlice";
export default function UrlSearch(){
    const [shortCode, setShortCode] = useState("");
    const dispatch = useDispatch();
    const {urlDetails,deleteMessage,loading,error} = useSelector((state) => state.url);
      const [longUrl, setLongUrl] = useState("");
      const[showDltMsg,setShowDltMsg]=useState(false)
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(getOriginalUrl(shortCode))
        console.log(urlDetails)
    }
      const handleDelete = () => {
        dispatch(deleteUrl({ shortCode }));
setShowDltMsg(true)
        setShortCode("")
      };
    return(
        <div id="search-container">
            <h3>URL SEARCH</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter short code ...." value={shortCode} onChange={(e)=>setShortCode(e.target.value)}/>
                <button type="submit">Search</button>
            </form>
            {loading && <p style={{color:"white"}}>Loading...</p>}
            {error && <p style={{color:"red"}}>{error}</p>}
            {showDltMsg &&(
                <div id="delete-message-container" >
                   <p >{deleteMessage}</p>
                    </div>
            )}
            {urlDetails && (
                <div id="original-url-container">
                    <p>Original URL: <a href={urlDetails.longUrl} target="_blank" rel="noopener noreferrer">{urlDetails.longUrl}</a></p>
                     <button id="delete-button" onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    )
}