import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shortenUrl, deleteUrl } from "./urlSlice";

export default function UrlForm() {
  const [longUrl, setLongUrl] = useState("");
  const dispatch = useDispatch();
  const { shortUrl,deleteMessage, loading, error } = useSelector((state) => state.url);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(shortenUrl(longUrl));
  };



  return (
    <div id="container">
      <h3>URL SHORTENER</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter long URL ..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {error && (
        <div id="error-container">
          <p id="error">{error}</p>
        </div>
      )}

      {shortUrl && (
        <div id="short-url-container">
          <p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

