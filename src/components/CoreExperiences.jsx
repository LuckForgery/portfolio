import CoreExperience from "./CoreExperience.jsx";
import { CORE_EXPERIENCE } from "./cv/data.js";

import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

SwiperCore.use([EffectCoverflow, Autoplay]);

export default function CoreExperiences() {
  return (
    <>
      <section className="title">
        <h2 id="experienceTitle">
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
          initialSlide={222}
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
    </>
  );
}
