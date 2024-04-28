import React from "react";
import "./index.scss";
const Card = () => {
  return (
    <div id="card">
      <div className="container">
        <div className="card">
          <h1>Контакты</h1>
          <div className="card--title">
            <div data-aos="fade-right" className="card--title__text">
              <h3>Тел: +996 702 311 004</h3>
              <h3>email: sultanmamytbekov98@gmail.com</h3>
              <h3>WhatsApp: +996 702 311 004</h3>
              <h3>Instagram: @Sultan_Mamytbekov</h3>
              <h3>Telegram: @Sultan_Mamytbekov_bot</h3>
              <h3>Адрес: Шопокова, 121/1</h3>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5846.20935520863!2d74.59654790521851!3d42.891738167829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2skg!4v1714290418608!5m2!1sru!2skg"
              width="620"
              height="450"
              title="card"
              style={{ border: "none", borderRadius: "5px" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
