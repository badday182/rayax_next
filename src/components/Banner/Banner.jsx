'use client'
import "./banner.css"
import { useState } from "react";

const Banner = () => {
    const [isBannerVisible, setIsBannerVisible] = useState(true);
    const closeBanner = () => {
        setIsBannerVisible(false);
      };
    return (
        <div className={`banner rounded-3 ${isBannerVisible ? "" : "hidden"}`}>
        <div className="content">
          <button id="closeBanner" onClick={closeBanner}>
            &times;
          </button>{" "}
          <p>На каву ₴ розробнику</p>
          <div className="logo privat-logo">
            <img
              style={{ backgroundColor: "white" }}
              src="https://d2z9uwnt8eubh7.cloudfront.net/media/default/0001/19/ac94eecabd0d3d915ab3ba18b6c4de6f22ad7dfe.png"
              alt="ПриватБанк лого"
            />
          </div>
          <div className="logo mono-logo">
            <img
              src="https://asset.brandfetch.io/id-CBRc8NA/idEsOSs4jS.jpeg?updated=1674203441813"
              alt="Монобанк лого"
            />
          </div>
          <p>------</p>
          <a
            className="mb-2 logo"
            href="https://www.youtube.com/@RayaX.project"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="m-0"
              src="https://upload.wikimedia.org/wikipedia/commons/a/a0/YouTube_social_red_circle_%282017%29.svg"
              alt="Ютуб лого"
            />
          </a>
          <a
            className="m-0 logo telegram-logo"
            href="https://t.me/Raya_X"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="m-0"
              src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
              alt="Телеграм лого"
            />
          </a>
        </div>
      </div>  
    )
}

export default Banner