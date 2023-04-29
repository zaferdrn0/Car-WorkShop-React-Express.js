import React from "react";
import "./css/header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-left">
          <a href="/">
            <img src="./images/logo.png" alt="logo" />
          </a>
          <a className="servis" href="/">
            <h5>Servis Bulmak İçin Tıklanıyız</h5>{" "}
          </a>
          <a href="/workshops?city=&district=&brand=&rtype=" className="dukkan">
            {" "}
            <h5>Servisler</h5>
          </a>
          <a className="dukkan">
            {" "}
            <h5>Yakıt Hesapla</h5>
          </a>
        </div>
        <div className="header-right">
          <a href="/login">
            <h5>Giriş Yap</h5>
          </a>
          <a href="/register">
            <h5>Kayıt Ol</h5>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
