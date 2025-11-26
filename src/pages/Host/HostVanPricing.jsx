import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
  const { van } = useOutletContext();
  return (
    <section className="van-details-price">
      <p>${van.price}/day</p>
    </section>
  );
}
