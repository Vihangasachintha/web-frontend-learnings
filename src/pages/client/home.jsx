import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import img1 from "../../assets/mainSlider/img1.jpg";
import img2 from "../../assets/mainSlider/img2.jpg";
import img3 from "../../assets/mainSlider/img3.jpg";

// import new1 from "../../assets/newArrivals/new1.png";
// import new2 from "../../assets/newArrivals/new2.png";
// import new3 from "../../assets/newArrivals/new3.png";
// import new4 from "../../assets/newArrivals/new4.png";

import NewArrivalProductCard from "../../components/newArrivalProductCard.jsx";
import { BrandCard } from "../../components/brandCard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/loading.jsx";

export default function ClientHomePage() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/new-arrivals")
      .then((res) => {
        setNewArrivals(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching new arrivals:", error);
        setNewArrivals([]);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/brands")
      .then((res) => {
        setBrands(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
        setBrands([]);
        setIsLoading(false);
      });
  }, []);

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
                    <Link 
                      to="/products"
                      className="inline-block bg-white text-black px-10 py-4 text-sm font-medium tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-all duration-300 border border-white"
                    >
                      Shop Now
                    </Link>
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
          className="flex flex-wrap p-5 gap-9 max-w-[1400px] mx-auto"
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
          {isLoading ? (
            <Loading />
          ) : newArrivals.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4">
              {newArrivals.map((product) => (
                <NewArrivalProductCard
                  key={product.productId}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-lg py-12">
              No new arrivals at the moment
            </div>
          )}
        </div>
      </div>

      <div className="w-full min-h-[300px] py-8">
        <div className="m-2">
          <label className="ms-16 text-xl font-semibold">Shop by Brand</label>
        </div>
        <div
          className="flex flex-wrap p-5 gap-19 max-w-[1400px] mx-auto"
          style={{ maxWidth: "calc((6rem + 1.25rem) * 11 + 2.5rem)" }}
        >
          {isLoading ? (
            <Loading />
          ) : brands.length > 0 ? (
            brands.map((brand) => (
              <BrandCard key={brand.name} brand={brand} />
            ))
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              No brands available at the moment
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
