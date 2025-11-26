import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
  const { van } = useOutletContext();
  return (
    <section className="van-details-photo">
      <img src={van.imageUrl} />
    </section>
  );
}
