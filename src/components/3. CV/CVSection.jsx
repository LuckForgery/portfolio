import cv from "./DariusB.pdf";

export default function CVSection() {
  return (
    <div className="buffer" id="buffer">
      <h2>
        <section>Welcome to my SandBox Space!</section>
      </h2>

      <p>
        I keep in here my latest activities and polished solutions in hope to
        cultivate my skills and spark new ideas.
        <br />
        Ultimately all of this is just for fun, and I'm more than happy to
        collaborate for more!
      </p>
      <div id="cv">
        <a href={cv} download="DariusB.pdf">
          cv
        </a>
      </div>
    </div>
  );
}
