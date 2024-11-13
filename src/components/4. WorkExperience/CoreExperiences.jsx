import CoreExperience from "./CoreExperience.jsx";
import { CORE_EXPERIENCE } from "./data.js";

import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

SwiperCore.use([EffectCoverflow, Autoplay]);

export default function CoreExperiences() {
  return (
    <>
      <div className="section">
        <section className="title">
          <h2 className="sectionTitle" id="experienceTitle">
            What Experience
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
            spaceBetween={22}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 222,
              modifier: 0.5,
              slideShadows: true,
            }}
            modules={[EffectCoverflow]}
          >
            {CORE_EXPERIENCE.map((data) => (
              <SwiperSlide className="content">
                <CoreExperience key={data} {...data} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </>
  );
}
