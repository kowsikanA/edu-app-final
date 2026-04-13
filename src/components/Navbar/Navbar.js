// import React, { useEffect, useState } from "react";
// import "./Navbar.css";
// import icon from "../../assets/images/icon2.png";
// import { Link, useLocation } from "react-router-dom";
// import { getGradeCookie } from "../../cookieUtils";
// import { useCoins } from "../../coinUtils";

// function Navbar() {
//   const location = useLocation();
//   const [grade, setGrade] = useState(getGradeCookie());
//   const [coins] = useCoins();

//   useEffect(() => {
//     setGrade(getGradeCookie());
//   }, [location.pathname]);

//   return (
//     <div className="navbar">
//       <div className="logo">
//         <Link to="/dashboard">
//           <img src={icon} alt="PennyPals Logo" />
//         </Link>
//       </div>

//       <div className="nav-list">
//         <ul>
//           <li>
//             <Link to="/dashboard" className="up">Home</Link>
//           </li>

//           <li>
//             <Link to={grade ? `/units/${grade}` : "/"} className="up">Lessons</Link>
//           </li>

//           <li>
//             <Link to={grade ? `/assessments/${grade}` : "/"} className="up">Assessments</Link>
//           </li>

//           <li>
//             <Link to={`/pet-shop`} className="up">Pet Shop</Link>
//           </li>

//           <li className="coins">🪙 {coins}</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Navbar;


import React, { useEffect, useState } from "react";
import "./Navbar.css";
import icon from "../../assets/images/icon2.png";
import { Link, useLocation } from "react-router-dom";
import { getGradeCookie } from "../../cookieUtils";
import { useCoins } from "../../coinUtils";

function Navbar() {
  const location = useLocation();
  const [grade, setGrade] = useState(getGradeCookie());
  const [coins] = useCoins();

  useEffect(() => {
    setGrade(getGradeCookie());
  }, [location.pathname]);

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/dashboard">
          <img src={icon} alt="PennyPals Logo" />
        </Link>
      </div>

      <div className="nav-list">
        <ul>
          <li>
            <Link to="/dashboard" className="up">Home</Link>
          </li>

          <li>
            <Link to={grade ? `/units/${grade}` : "/"} className="up">Lessons</Link>
          </li>

          <li>
            <Link to={grade ? `/assessments/${grade}` : "/"} className="up">Assessments</Link>
          </li>

          <li>
  <Link to="/simulator" className="up">Invest</Link>
</li>
          <li>
            <Link to="/pet-shop" className="up">Pet Shop</Link>
          </li>

          <li className="coins">🪙 {coins}</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;