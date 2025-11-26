import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function HostVans() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVans() {
      const req = await fetch("/api/host/vans");
      const data = await req.json();

      setVans(data.vans);
      setLoading(false);
    }

    fetchVans();
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
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
