import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUrl } from "./urlSlice";

export default function UrlUpdate() {
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const { updatedUrl, loading, error } = useSelector((state) => state.url);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUrl({ longUrl, shortCode }));
  };

  return (
    <div id="update-container">
      <h3>Update URL</h3>
      <form onSubmit={handleSubmit}>
        <div id="update-input-container">
          <input
            type="text"
            placeholder="Enter new longUrl..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter shortCode..."
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
          />
        </div>
        <div id="update-button-container">
          <button id="update-button" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
  {updatedUrl && (
    <div id="updatedResult">
  <p>
    Updated URL: <a href={updatedUrl.longUrl} target="_blank" rel="noopener noreferrer">
      {updatedUrl.longUrl}
    </a>
  </p>
</div>

)}
    </div>
  );
}
