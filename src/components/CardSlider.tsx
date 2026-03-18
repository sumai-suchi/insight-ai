import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const cards = [
  {
    title: "Adobe Photoshop",
    description: "Edit and transform your images",
    img: "https://i.ibb.co.com/G3BHr5s5/photoshpo.jpg",
  },
  {
    title: "Create with Canva",
    description: "Make designs and flyers",
    img: "https://i.ibb.co.com/VYX1zW8R/canva.jpg",
  },
  {
    title: "App Images Collection",
    description: "Explore various app interfaces",
    img: "https://i.ibb.co.com/b5DTTM4X/app-images.jpg",
  },
];
export default function CardSlider() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1.5}
      loop={true}
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 2500, // 2.5 seconds
        disableOnInteraction: false, // user swipe করলেও বন্ধ হবে না
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      {cards.map((card, index) => (
        <SwiperSlide key={index}>
          <div className="bg-white rounded-xl shadow-md p-4">
            <img src={card.img} className="rounded-lg mb-2" alt={card.title} />
            <h3 className="font-bold text-lg">{card.title}</h3>
            <p>{card.description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
