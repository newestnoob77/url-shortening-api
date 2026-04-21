import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getStats } from "./urlSlice";
export default function UrlStats(){
    const[showStat,setShowStat]=useState(false)
    const [shortCode,setShortCode]=useState("")
    const {stats,error,loading}=useSelector((state)=>state.url)
    const dispatch = useDispatch()
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(getStats(shortCode))
        setShowStat(true)
        console.log(stats)
    }
    return(
        <div id="stats-container">
            <h3 style={{textAlign:"center"}}>Get stats</h3>
            <form onSubmit={handleSubmit}>
           <input type="text" placeholder="Enter short code ...." value={shortCode} onChange={(e)=>setShortCode(e.target.value)}/>
           <button>Get stats</button>
            </form>
            {showStat&&stats&&(
            <div id="stats-display-container">
 <p>Short Code: {stats.shortCode}</p>
    <p>Long URL: {stats.longUrl}</p>
    <p>Access Count: {stats.accessCount}</p>
            </div>
            )}

        </div>
    )
}