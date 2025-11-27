import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Badge from "../../components/Badge";
import { getVans } from "../../utils/api";

export default function Vans() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const vans = await getVans();
        setVans(vans);
      } catch (err) {
        setError(`Error fetching vans: ${err}`);
      } finally {
        setLoading(false);
      }
    }

    loadData();
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

  const typeFilter = searchParams.get("type");
  const displayedVans = typeFilter
    ? vans.filter((van) => van.type.toLowerCase() == typeFilter)
    : vans;

  return (
    <>
      <h1 className="vans-header">Explore our van options</h1>
      <div className="vans-filter-container">
        <button
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          }`}
          onClick={() => setSearchParams({ type: "simple" })}
        >
          Simple
        </button>
        <button
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          }`}
          onClick={() => setSearchParams({ type: "rugged" })}
        >
          Rugged
        </button>
        <button
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          }`}
          onClick={() => setSearchParams({ type: "luxury" })}
        >
          Luxury
        </button>
        {typeFilter && (
          <button
            className="van-type clear-filters"
            onClick={() => setSearchParams({})}
          >
            Clear Filter
          </button>
        )}
      </div>
      <section className="vans-container">
        {displayedVans.map((van) => {
          return (
            <Link
              key={van.id}
              className="van-card"
              to={van["id"]}
              state={{ search: searchParams.toString() }}
            >
              <img src={van["imageUrl"]} />
              <div className="van-item-description">
                <div>{van["name"]}</div>
                <div className="van-item-price">
                  <span>${van["price"]}</span>
                  <div>/day</div>
                </div>
              </div>
              <Badge variant={van["type"]}>{van["type"]}</Badge>
            </Link>
          );
        })}
      </section>
    </>
  );
}
