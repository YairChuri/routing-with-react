import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Badge from "../../components/Badge";
import HostVansLayout from "../../components/HostVansLayout";
import { getHostVan } from "../../utils/api";
import AuthContext from "../../components/AuthContext";

export default function HostVanDetails() {
  const [van, setVan] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();
  const { userData } = useContext(AuthContext);
  useEffect(() => {
    async function fetchVan() {
      try {
        const van = await getHostVan(params.id, userData.id);
        setVan(van);
      } catch (err) {
        setError(`Error fetching vans: ${err}`);
      } finally {
        setLoading(false);
      }
    }

    fetchVan();
  }, []);

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
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <div className="host-van-details-container">
        <div className="host-van-details-card">
          <div className="host-van-details">
            <img src={van.imageUrl} />
            <div className="host-van-card-data">
              <Badge variant={van.type}>{van.type}</Badge>
              <h1>{van.name}</h1>
              <p>${van.price}/day</p>
            </div>
          </div>
          <HostVansLayout van={{ van }} />
        </div>
      </div>
    </>
  );
}
