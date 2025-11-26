export default function Badge({ children, variant }) {
  const className = variant ? `badge badge-${variant}` : "badge";
  const capitalized = children[0].toUpperCase() + children.slice(1);

  return <div className={className}>{capitalized}</div>;
}
