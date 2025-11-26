import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Badge from "../../components/Badge";
import HostVansLayout from "../../components/HostVansLayout";
export default function HostVanDetails() {
  const [van, setVan] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    async function fetchVan() {
      const req = await fetch(`/api/host/vans/${params.id}`);
      const data = await req.json();
      console.log(data.vans);
      setVan(data.vans[0]);
      setLoading(false);
    }

    fetchVan();
  }, []);

  if (loading) return <p>Loading...</p>;

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
