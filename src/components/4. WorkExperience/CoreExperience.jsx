export default function CoreExperience({ image, title, institute, end }) {
  return (
    <>
      <div className="innerContent">
        <img src={image} alt={"pic"} id="cover" />
        <h3>{title}</h3>
        <img src={institute.logo} alt="" id="logo" />
        <div className="status" id={end === "" ? "active" : "inacive"}></div>
      </div>
    </>
  );
}
