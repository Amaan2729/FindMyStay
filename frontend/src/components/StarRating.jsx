export default function StarRating({ rating }) {
  return (
    <span style={{ color: "#f5a623", fontSize: "13px", letterSpacing: "-1px" }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      <span style={{ color: "#ccc" }}>{"★".repeat(5 - Math.ceil(rating))}</span>
    </span>
  );
}
