import companiesImage from "../../../../assets/prologis.png";
import towerImage from "../../../../assets/tower.png";
import equinixImage from "../../../../assets/equinix.png";
import realtyImage from "../../../../assets/realty.png";
import "./Companies.css";

const Companies = () => {
  return (
    <section className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        <img src={equinixImage} alt="Equinix" />
        <img src={towerImage} alt="Tower" />
        <img src={companiesImage} alt="Prologis" />
        <img src={realtyImage} alt="Realty" />
      </div>
    </section>
  );
};

export default Companies;
