import StarryCanvas from "./StarryCanvas.jsx";

export default function MainBlock() {
  return (
    <div className="profile">
      <div className="stars">
        <StarryCanvas className="canvas" />
      </div>
      <a>Pro. Beyond</a>
    </div>
  );
}
