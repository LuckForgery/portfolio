import setSkills from "./HandleSkills.js";

export default function SkillBoard() {
  setSkills();
  return (
    <>
      <table id="dynamicTable">
        <tbody></tbody>
      </table>
    </>
  );
}
