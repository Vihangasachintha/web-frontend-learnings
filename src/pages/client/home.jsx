import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function ClientHomePage() {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1920&q=80",
      title: "NEW ARRIVALS",
      subtitle: "Discover Our Latest Collection"
    },
    {
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1920&q=80",
      title: "PREMIUM QUALITY",
      subtitle: "Luxury Products for Every Occasion"
    },
    {
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&q=80",
      title: "SPECIAL OFFERS",
      subtitle: "Up to 50% Off on Selected Items"
    }
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation
        pagination={{ 
          clickable: true,
          dynamicBullets: false
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="hero-carousel"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[500px] md:h-[650px] lg:h-[750px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-end">
                <div className="text-right max-w-xl">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.2em] text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white mb-8 font-light tracking-wider">
                    {slide.subtitle}
                  </p>
                  <button className="bg-white text-black px-10 py-4 text-sm font-medium tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-all duration-300 border border-white">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .hero-carousel .swiper-button-next,
        .hero-carousel .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.2);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .hero-carousel .swiper-button-next:hover,
        .hero-carousel .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        
        .hero-carousel .swiper-button-next::after,
        .hero-carousel .swiper-button-prev::after {
          font-size: 20px;
        }
        
        .hero-carousel .swiper-pagination-bullet {
          width: 40px;
          height: 3px;
          border-radius: 0;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .hero-carousel .swiper-pagination-bullet-active {
          background: white;
          width: 60px;
        }
      `}</style>
    </div>
  );
}

