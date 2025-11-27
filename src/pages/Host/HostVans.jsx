import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../../utils/api";
export default function HostVans() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchVans() {
      try {
        const data = await fetchData("/api/host/vans");

        setVans(data.vans);
      } catch (err) {
        setError(`Error fetching vans: ${err}`);
      } finally {
        setLoading(false);
      }
    }

    fetchVans();
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
    <section className="host-van-section">
      <h1>Your listed vans</h1>
      {vans.map((van) => {
        return (
          <Link key={van.id} className="host-van-card" to={van.id}>
            <img src={van.imageUrl} />
            <div className="host-van-card-data">
              <h1>{van.name}</h1>
              <p>${van.price}/day</p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
