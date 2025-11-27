import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Badge from "../../components/Badge";
import { getVan } from "../../utils/api";

export default function VanDetails() {
  const params = useParams();
  const [van, setVan] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const van = await getVan(params.id); //(`/api/vans/${params.id}`);
        setVan(van);
      } catch (err) {
        setError(`Error fetching vans: ${err}`);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <Link
        to={location.state?.search ? `..?${location.state.search}` : ".."}
        relative="path"
        className="back-button"
      >
        &larr;{" "}
        <span>Back to {location.state?.search ? van.type : "all"} vans</span>
      </Link>
      <div className="van-details">
        <img src={van["imageUrl"]} />
        <Badge variant={van["type"]}>{van["type"]}</Badge>
        <div className="van-card-name">{van["name"]}</div>
        <div>
          <span className="van-card-price">${van["price"]}</span>
          <span>/day</span>
        </div>
        <p>{van["description"]}</p>
      </div>
    </>
  );
}
