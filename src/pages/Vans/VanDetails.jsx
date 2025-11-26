import "../../App.css";
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Badge from "../../components/Badge";
import { fetchData } from "../../utils/api";

export default function VanDetails() {
  const params = useParams();
  const [van, setVan] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  console.log(location);
  useEffect(() => {
    async function loadData() {
      try {
        const data = fetchData(`/api/vans/${params.id}`);
        setVan(data.vans);
      } catch (error) {
        console.error("Error fetching vans", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;

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
