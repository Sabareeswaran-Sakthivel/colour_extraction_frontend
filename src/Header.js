import "./Header.css";
import { NavLink } from "react-router-dom";
// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return (
    <div className="header">
      <div>Colour Comparison</div>
      <div className="route">
        <NavLink
          className={({ isActive }) => (isActive ? "link active" : "link")}
          to="/"
        >
          <span>Colour Extraction</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "link active" : "link")}
          to="/detectchecking"
        >
          <span>Defect Checking</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "link active" : "link")}
          to="/espModule"
        >
          <span>Defect Detection</span>
        </NavLink>
      </div>
    </div>
  );
}
