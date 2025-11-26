import { useOutletContext } from "react-router-dom";

export default function HostVanInfo() {
  const { van } = useOutletContext();
  return (
    <section className="van-details-info">
      <h3>{van.name}</h3>
      <p>Category: {van.type}</p>
      <p>Description: {van.description}</p>
      <p>Visibility: public</p>
    </section>
  );
}
