import React from "react";

const WorkshopBox = (props) => {
  const { workshop } = props;
  console.log(workshop);

  return (
    <>
      <div className="workshop-component">
        <div className="left">
          <img src={`/images/${workshop.image}`} />
        </div>
        <div className="right">
          <div className="left">
            <div>
              <h2>{workshop.name}</h2>
              <h3>{workshop.description}</h3>
              <hr></hr>
            </div>
            <div className="brand-repair">
              <hr></hr>
              <div className="brand">
                <h2>Markalar</h2>
                {workshop?.brand?.map((brand, index) => {
                  return <h4 key={index}>{brand.brand}</h4>;
                })}
              </div>
              <div className="repair">
                <h2>Tamir Turu</h2>
                {workshop?.maintenance?.map((repair, index) => {
                  return <h4 key={index}>{repair.ad}</h4>;
                })}
              </div>
              <hr></hr>
            </div>
          </div>
        </div>
      </div>
      <div className="map-phone-container">
        <h2>Konum ve İletişim Bilgileri</h2>
        <div className="map-phone">
          <div>
            <img src="images/googleMaps.png" />
          </div>
          <div className="location-phone">
            <h2>
              {workshop.address?.address +
                "  " +
                workshop.address?.city +
                "  " +
                workshop.address?.distict}
            </h2>
            <h2>Fuat otogaz yanı</h2>
            <hr></hr>
            <div className="phone-email">
              <div className="phone"></div>
              <h3>Telefon : {workshop.phone}</h3>
              <h3>Eposta : {workshop.email} </h3>
              <h3>
                <a href="#">Web Site</a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkshopBox;
