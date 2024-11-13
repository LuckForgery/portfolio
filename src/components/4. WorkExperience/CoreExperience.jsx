export default function CoreExperience({
  image,
  title,
  institute,
  start,
  end,
}) {
  return (
    <>
      <div className="innerContent">
        <img src={image} alt={"pic"} id="cover" />
        <div id="titleEnclosure">
          <section>{title}</section>
        </div>
        <div id="timeEnclosure">
          <section>
            {start} - {end === "" ? "Now" : end}
          </section>
        </div>
        <img src={institute.logo} alt="" id="logo" />
        <div className="status" id={end === "" ? "active" : "inacive"}></div>
      </div>
    </>
  );
}
