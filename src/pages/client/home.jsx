import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import img1 from "../../assets/mainSlider/img1.jpg";
import img2 from "../../assets/mainSlider/img2.jpg";
import img3 from "../../assets/mainSlider/img3.jpg";

import NewArrivalProductCard from "../../components/newArrivalProductCard.jsx";
import { BrandCard } from "../../components/brandCard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/loading.jsx";

export default function ClientHomePage() {
  const navigate = useNavigate();
  const [newArrivals, setNewArrivals] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryClick = (category) => {
    navigate(`/products/category/${category}`);
  };

  const handleBrandClick = (brandObj) => {
    navigate(`/products/brand/${brandObj._id}`, { 
      state: { brandName: brandObj.name, brandId: brandObj._id } 
    });
  };

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
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] xl:h-[700px]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-opacity-10"></div>
                <div className="absolute inset-0 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-center md:justify-end">
                  <div className="text-center md:text-right max-w-xl w-full md:w-auto px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[0.15em] md:tracking-[0.2em] text-white mb-3 md:mb-4 drop-shadow-[0_2px_10px_rgba(0,0,1,1)]">
                      {slide.title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-8 font-light tracking-wide md:tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                      {slide.subtitle}
                    </p>
                    <Link 
                      to="/products"
                      className="inline-block bg-white text-black px-6 sm:px-8 md:px-10 py-3 md:py-4 text-xs sm:text-sm font-medium tracking-[0.12em] md:tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-all duration-300 border border-white"
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
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        @media (min-width: 768px) {
          .hero-carousel .swiper-button-next,
          .hero-carousel .swiper-button-prev {
            width: 50px;
            height: 50px;
          }
        }
        
        .hero-carousel .swiper-button-next:hover,
        .hero-carousel .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        
        .hero-carousel .swiper-button-next::after,
        .hero-carousel .swiper-button-prev::after {
          font-size: 16px;
        }
        
        @media (min-width: 768px) {
          .hero-carousel .swiper-button-next::after,
          .hero-carousel .swiper-button-prev::after {
            font-size: 20px;
          }
        }
        
        .hero-carousel .swiper-pagination-bullet {
          width: 30px;
          height: 3px;
          border-radius: 0;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        @media (min-width: 768px) {
          .hero-carousel .swiper-pagination-bullet {
            width: 40px;
          }
        }
        
        .hero-carousel .swiper-pagination-bullet-active {
          background: white;
          width: 45px;
        }
        
        @media (min-width: 768px) {
          .hero-carousel .swiper-pagination-bullet-active {
            width: 60px;
          }
        }
      `}</style>
      </div>

      <div className="w-full min-h-[300px] py-6 md:py-8 lg:py-10">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 mb-4 md:mb-6">
          <label className="text-lg sm:text-xl md:text-2xl font-semibold">
            Shop by Category
          </label>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-pink-500" onClick={() => handleCategoryClick("Skincare")}>
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-0 rounded-full hover:scale-110 transition-transform duration-300"
              src="/categories/skincare.png"
              alt="Skincare"
            />
            <label className="cursor-pointer text-xs sm:text-sm md:text-base mt-2" htmlFor="" >
              Skincare
            </label>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-pink-500" onClick={() => handleCategoryClick("Makeup")}>
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-0 rounded-full hover:scale-110 transition-transform duration-300"
              src="/categories/makeup.png"
              alt="Makeup"
            />
            <label className="cursor-pointer text-xs sm:text-sm md:text-base mt-2" htmlFor="">Makeup</label>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-pink-500" onClick={() => handleCategoryClick("Hair")}>
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-0 rounded-full hover:scale-110 transition-transform duration-300"
              src="/categories/hair.png"
              alt="Hair"
            />
            <label className="cursor-pointer text-xs sm:text-sm md:text-base mt-2" htmlFor="">Hair</label>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-pink-500" onClick={() => handleCategoryClick("Bath & Body")}>
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-0 rounded-full hover:scale-110 transition-transform duration-300"
              src="/categories/bathbody.png"
              alt="Bath & Body"
            />
            <label className="cursor-pointer text-xs sm:text-sm md:text-base mt-2" htmlFor="">Bath & Body</label>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-pink-500" onClick={() => handleCategoryClick("Fragrance")}>
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-0 rounded-full hover:scale-110 transition-transform duration-300"
              src="/categories/fragrances.png"
              alt="Fragrance"
            />
            <label className="cursor-pointer text-xs sm:text-sm md:text-base mt-2" htmlFor="">Fragrance</label>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-pink-500" onClick={() => handleCategoryClick("Wellness")}>
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-0 rounded-full hover:scale-110 transition-transform duration-300"
              src="/categories/wellness.png"
              alt="Wellness"
            />
            <label className="cursor-pointer text-xs sm:text-sm md:text-base mt-2" htmlFor="">Wellness</label>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-pink-500" onClick={() => handleCategoryClick("Tools & Accessories")}>
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-0 rounded-full hover:scale-110 transition-transform duration-300"
              src="/categories/tools.png"
              alt="Tools & Accessories"
            />
            <label className="cursor-pointer text-xs sm:text-sm md:text-base mt-2" htmlFor="">Tools & Accessories</label>
          </div>
        </div>
      </div>

      <div className="w-full py-6 md:py-8">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 md:px-8 lg:px-12 mb-4 md:mb-6 gap-2 sm:gap-0">
          <div className="w-full sm:w-auto">
            <label htmlFor="" className="text-lg sm:text-xl md:text-2xl font-semibold">
              New Arrivals
            </label>
          </div>
          <div className="w-full sm:w-auto flex justify-start sm:justify-end">
            <a href="" className="underline text-sm sm:text-base hover:text-accent transition-colors">
              View All
            </a>
          </div>
        </div>

        <div className="w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex flex-row gap-5 justify-center">
          {isLoading ? (
            <div className="w-full flex justify-center items-center">
              <Loading />
            </div>
          ) : newArrivals.length > 0 ? (
            <div className="w-full overflow-x-auto overflow-y-hidden px-4 sm:px-6 md:px-8">
              <div className="flex md:flex-wrap md:justify-center gap-4 md:gap-6 pb-4 md:pb-0 min-w-max md:min-w-0">
                {newArrivals.map((product) => (
                  <div key={product.productId} className="flex-shrink-0 md:flex-shrink">
                    <NewArrivalProductCard
                      product={product}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center text-gray-500 text-sm sm:text-base md:text-lg py-12">
              No new arrivals at the moment
            </div>
          )}
        </div>
      </div>

      <div className="w-full min-h-[300px] py-6 md:py-8 lg:py-10">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 mb-4 md:mb-6">
          <label className="text-lg sm:text-xl md:text-2xl font-semibold">Shop by Brand</label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          {isLoading ? (
            <Loading />
          ) : brands.length > 0 ? (
            brands.map((brand) => (
              <BrandCard key={brand._id} brand={brand} onClick={() => handleBrandClick(brand)} />
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center text-gray-500 text-sm sm:text-base md:text-lg py-8 md:py-12">
              No brands available at the moment
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
