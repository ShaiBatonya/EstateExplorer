import companiesImage from "../../../../assets/prologis.png";
import towerImage from "../../../../assets/tower.png";
import equinixImage from "../../../../assets/equinix.png";
import realtyImage from "../../../../assets/realty.png";

import "./Companies.css";
const Companies = () => {
  return (
    <section className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        <img src={equinixImage} alt="" />
        <img src={towerImage} alt="" />
        <img src={companiesImage} alt="" />
        <img src={realtyImage} alt="" />
      </div>
    </section>
  );
};

export default Companies;
