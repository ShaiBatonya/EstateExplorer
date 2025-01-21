
import companiesImage from "../../../../assets/prologis.png";
import towerImage from "../../../../assets/tower.png";
import equinixImage from "../../../../assets/equinix.png";
import realtyImage from "../../../../assets/realty.png";
import "./Companies.css";

const Companies = () => {
  return (
    <section className="c-wrapper">
      <div className="c-container">
        <h2 className="companies-title">Our Trusted Partners</h2>
        <div className="companies-images">
          <img src={equinixImage} alt="Equinix" />
          <img src={towerImage} alt="Tower" />
          <img src={companiesImage} alt="Prologis" />
          <img src={realtyImage} alt="Realty" />
        </div>
      </div>
    </section>
  );
};

export default Companies;
