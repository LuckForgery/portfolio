export default function TopBar() {
  return (
    <div className="navBar">
      <table>
        <tr className="menue">
          <td id="m1">
            <a href="#bufferTop">Home Section</a>
          </td>
          <td id="m2">
            <a href="#experienceTitle">Experience</a>
          </td>
          <td id="m3">
            <a href="#">Active Skills</a>
          </td>
          <td id="m4">
            <a href="#">My Solutions</a>
          </td>
        </tr>
        <tr className="details">
          <td id="name">Darius Boteand</td>
          <td id="LinkedIn">
            <div
              onClick={() => {
                window.open("https://www.linkedin.com/in/darius-ic-boteand");
              }}
            >
              in
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}
