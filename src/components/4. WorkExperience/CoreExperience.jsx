export default function CoreExperience({ image }) {
  return (
    <>
      <img src={image} alt={"pic"} />
      <div className="text-content">
        <h3>Photography</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
          accusamus ratione nesciunt atque, dolores vel culpa debitis officia
          expedita unde?
        </p>
        <button className="btn">Read more</button>
      </div>
    </>
  );
}
