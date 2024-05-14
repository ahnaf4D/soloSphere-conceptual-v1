// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import bgImage1 from '../assets/carousel1.jpg';
import bgImage2 from '../assets/carousel2.jpg';
import bgImage3 from '../assets/carousel3.jpg';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

export default function Carousel() {
  return (
    <div className='container mx-auto px-6 py-10'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={bgImage1}
            text='Hire Web Developer for build your website'
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgImage2}
            text='Hire Graphics Designer for Design your brand'
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgImage3}
            text='Hire Digital Marketer for grow your business'
          ></Slide>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
