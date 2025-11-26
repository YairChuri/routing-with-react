import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="not-found-container">
      <div className="not-found-card">
        <p>Sorry, the page you were looking for was not found.</p>
        <Link to={"/"}>Return to Home</Link>
      </div>
    </section>
  );
}
