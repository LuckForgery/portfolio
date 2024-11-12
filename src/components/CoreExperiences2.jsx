import CoreExperience from "./CoreExperience.jsx";
import { CORE_EXPERIENCE } from "./cv/data.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function CoreExperiences2() {
  return (
    <>
      <section className="title">
        <h2>
          What experience
          <br />
          do I have?
        </h2>
      </section>
      <section className="collection">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2,
            slideShadows: true,
          }}
          modules={[EffectCoverflow]}
        >
          {CORE_EXPERIENCE.map((data) => (
            <SwiperSlide className="content">
              <CoreExperience key={data.image} {...data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
      />
    </>
  );
}
