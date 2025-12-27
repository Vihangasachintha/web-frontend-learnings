import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import img1 from "../../assets/mainSlider/img1.jpg";
import img2 from "../../assets/mainSlider/img2.jpg";
import img3 from "../../assets/mainSlider/img3.jpg";

import new1 from "../../assets/newArrivals/new1.png";
import new2 from "../../assets/newArrivals/new2.png";
import new3 from "../../assets/newArrivals/new3.png";
import new4 from "../../assets/newArrivals/new4.png";

export default function ClientHomePage() {
  const slides = [
    {
      image: img1,
      title: "NEW ARRIVALS",
      subtitle: "Discover Our Latest Collection",
    },
    {
      image: img2,
      title: "PREMIUM QUALITY",
      subtitle: "Luxury Products for Every Occasion",
    },
    {
      image: img3,
      title: "SPECIAL OFFERS",
      subtitle: "Up to 50% Off on Selected Items",
    },
  ];

  return (
    <div className="w-full flex flex-col">
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation
          pagination={{
            clickable: true,
            dynamicBullets: false,
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
              <div className="relative w-full h-[620px]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-opacity-10"></div>
                <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-end">
                  <div className="text-right max-w-xl">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.2em] text-white mb-4 drop-shadow-[0_2px_10px_rgba(0,0,1,1)]">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white mb-8 font-light tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
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

      <div className="w-full min-h-[300px] py-8">
        <div className="m-2">
          <label className="ms-16 text-xl font-semibold">
            Shop by Category
          </label>
        </div>
        <div
          className="flex flex-wrap p-5 gap-5 max-w-[1400px] mx-auto"
          style={{ maxWidth: "calc((6rem + 1.25rem) * 11 + 2.5rem)" }}
        >
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-pink-500">
            <img
              className="w-24 h-24 border-0 rounded-full hover:scale-110 transition-transform duration-300"
              src="/categories/skincare.png"
              alt="Skincare"
            />
            <label className="" htmlFor="">
              Skincare
            </label>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-pink-500">
            <img
              className="w-24 h-24 border-0 rounded-full hover:scale-110 transition-transform duration-300"
              src="/categories/makeup.png"
              alt="Makeup"
            />
            <label htmlFor="">Makeup</label>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-pink-500">
            <img
              className="w-24 h-24 border-0 rounded-full hover:scale-110 transition-transform duration-300"
              src="/categories/hair.png"
              alt="Hair"
            />
            <label htmlFor="">Hair</label>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-pink-500">
            <img
              className="w-24 h-24 border-0 rounded-full hover:scale-110 transition-transform duration-300"
              src="/categories/bathbody.png"
              alt="Bath & Body"
            />
            <label htmlFor="">Bath & Body</label>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-pink-500">
            <img
              className="w-24 h-24 border-0 rounded-full hover:scale-110 transition-transform duration-300"
              src="/categories/fragrances.png"
              alt="Fragrance"
            />
            <label htmlFor="">Fragrance</label>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-pink-500">
            <img
              className="w-24 h-24 border-0 rounded-full hover:scale-110 transition-transform duration-300"
              src="/categories/wellness.png"
              alt="Wellness"
            />
            <label htmlFor="">Wellness</label>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-pink-500">
            <img
              className="w-24 h-24 border-0 rounded-full hover:scale-110 transition-transform duration-300"
              src="/categories/tools.png"
              alt="Tools & Accessories"
            />
            <label htmlFor="">Tools & Accessories</label>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="w-full flex">
          <div className="w-[50%] p-3 ps-20">
            <label htmlFor="" className="text-[22px]">
              New Arrivals
            </label>
          </div>
          <div className="w-[50%] p-3 pe-20 flex justify-end">
            <a href="" className="underline mt-1">
              View All
            </a>
          </div>
        </div>

        <div className="w-full h-[500px] flex flex-row gap-5 justify-center">
          <div className="w-[20%] shadow shadow-fuchsia-500 h-[480px] rounded-xl">
            <div className="h-[300px]">
              <img
                src={new1}
                className="w-[100%] h-[100%] rounded-t-xl"
                alt=""
              />
            </div>
            <div className="h-[180px]">
              <div class="h-[50px] flex justify-center p-4 rounded-lg w-auto space-x-1 lg:space-x-2">
                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M119.4 44.1C164.1 36.51 211.3 51.37 243.1 83.99L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.09L119.4 44.1zM255.1 186.5V407.4L420.7 253.6C438.1 237.4 448 214.7 448 190.9V185.1C448 146.5 420.1 113.6 382 107.2C356.9 103 331.3 111.2 313.2 129.3L255.1 186.5z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
                  </svg>
                </button>
              </div>
              <div className="w-full flex justify-center items-center h-[75px]">
                <label className="text-center text-lg text-gray-500">
                  ANUA Niacinamide 10% + TXA 4% Dark Spot Correcting Serum 30ml
                </label>
              </div>
              <div className="flex">
                <div className="w-[50%] flex justify-center items-center mt-2">
                  <label>Rs.2,560.00</label>
                </div>
                <div className="w-[50%] flex justify-center items-center mt-2">
                  <button className="w-[100px] h-[40px] bg-pink-500 rounded-xl text-white cursor-pointer hover:bg-pink-600">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[20%] shadow shadow-fuchsia-500 h-[480px] rounded-xl">
            <div className="h-[300px]">
              <img
                src={new2}
                className="w-[100%] h-[100%] rounded-t-xl"
                alt=""
              />
            </div>
            <div className="h-[180px]">
              <div class="h-[50px] flex justify-center p-4 rounded-lg w-auto space-x-1 lg:space-x-2">
                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M119.4 44.1C164.1 36.51 211.3 51.37 243.1 83.99L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.09L119.4 44.1zM255.1 186.5V407.4L420.7 253.6C438.1 237.4 448 214.7 448 190.9V185.1C448 146.5 420.1 113.6 382 107.2C356.9 103 331.3 111.2 313.2 129.3L255.1 186.5z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
                  </svg>
                </button>
              </div>
              <div className="w-full flex justify-center items-center h-[75px]">
                <label className="text-center text-lg text-gray-500">
                  Product Name Here
                </label>
              </div>
              <div className="flex">
                <div className="w-[50%] flex justify-center items-center mt-2">
                  <label>Rs.2,560.00</label>
                </div>
                <div className="w-[50%] flex justify-center items-center mt-2">
                  <button className="w-[100px] h-[40px] bg-pink-500 rounded-xl text-white cursor-pointer hover:bg-pink-600">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[20%] shadow shadow-fuchsia-500 h-[480px] rounded-xl">
            <div className="h-[300px]">
              <img
                src={new3}
                className="w-[100%] h-[100%] rounded-t-xl"
                alt=""
              />
            </div>
            <div className="h-[180px]">
              <div class="h-[50px] flex justify-center p-4 rounded-lg w-auto space-x-1 lg:space-x-2">
                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M119.4 44.1C164.1 36.51 211.3 51.37 243.1 83.99L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.09L119.4 44.1zM255.1 186.5V407.4L420.7 253.6C438.1 237.4 448 214.7 448 190.9V185.1C448 146.5 420.1 113.6 382 107.2C356.9 103 331.3 111.2 313.2 129.3L255.1 186.5z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
                  </svg>
                </button>
              </div>
              <div className="w-full flex justify-center items-center h-[75px]">
                <label className="text-center text-lg text-gray-500">
                  Product Name Here
                </label>
              </div>
              <div className="flex">
                <div className="w-[50%] flex justify-center items-center mt-2">
                  <label>Rs.2,560.00</label>
                </div>
                <div className="w-[50%] flex justify-center items-center mt-2">
                  <button className="w-[100px] h-[40px] bg-pink-500 rounded-xl text-white cursor-pointer hover:bg-pink-600">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[20%] shadow shadow-fuchsia-500 h-[480px] rounded-xl">
            <div className="h-[300px]">
              <img
                src={new4}
                className="w-[100%] h-[100%] rounded-t-xl"
                alt=""
              />
            </div>
            <div className="h-[180px]">
              <div class="h-[50px] flex justify-center p-4 rounded-lg w-auto space-x-1 lg:space-x-2">
                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M119.4 44.1C164.1 36.51 211.3 51.37 243.1 83.99L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.09L119.4 44.1zM255.1 186.5V407.4L420.7 253.6C438.1 237.4 448 214.7 448 190.9V185.1C448 146.5 420.1 113.6 382 107.2C356.9 103 331.3 111.2 313.2 129.3L255.1 186.5z" />
                  </svg>
                </button>

                <button>
                  <svg
                    class="text-pink-500 w-5 h-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
                  </svg>
                </button>
              </div>
              <div className="w-full flex justify-center items-center h-[75px]">
                <label className="text-center text-lg text-gray-500">
                  Product Name Here
                </label>
              </div>
              <div className="flex">
                <div className="w-[50%] flex justify-center items-center mt-2">
                  <label>Rs.2,560.00</label>
                </div>
                <div className="w-[50%] flex justify-center items-center mt-2">
                  <button className="w-[100px] h-[40px] bg-pink-500 rounded-xl text-white cursor-pointer hover:bg-pink-600">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
