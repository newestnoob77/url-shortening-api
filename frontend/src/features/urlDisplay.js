import UrlSearch from "./urlSearch";
import UrlForm from "./urlForm";
import UrlUpdate from "./urlUpdate";
import UrlStats from "./urlStats";
import { useState } from "react";

export default function UrlDisplay() {
  const [activeView, setActiveView] = useState("search");

  return (
    <div id="url-container">
      <div id="button-container">
        <button id="url-search-btn" onClick={() => setActiveView("search")}>
          Search for a URL
        </button>
        <button id="url-create-btn" onClick={() => setActiveView("create")}>
          Create a URL
        </button>
        <button id="url-update-btn" onClick={() => setActiveView("update")}>
          Update URL
        </button>
        <button id="url-stat-btn" onClick={()=>setActiveView("stats")}>
          Get Stats
        </button>
      </div>

      {activeView === "search" && <UrlSearch />}
      {activeView === "create" && <UrlForm />}
      {activeView === "update" && <UrlUpdate />}
      {activeView==="stats" && <UrlStats/>}
    </div>
  );
}
