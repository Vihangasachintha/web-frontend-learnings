export default function NewArrivalProductCard({ product }) {
  if (product) {
    return (
      <div className="w-[20%] shadow shadow-fuchsia-500 h-[480px] rounded-xl">
        <div className="h-[300px]">
          <img
            src={product.images[0]}
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
              {product.name}
            </label>
          </div>
          <div className="flex">
            <div className="w-[50%] flex-col justify-center items-center mt-2">
              <div className="w-[100%] justify-start items-center flex ps-5">
                <label className="text-gray-500 line-through decoration-gray-400">Rs.{product.labelPrice}.00</label>
              </div>
              <div className="w-[100%] justify-start items-center flex ps-5">
                <label>Rs.{product.price}.00</label>
              </div>
            </div>
            <div className="w-[50%] flex justify-center items-center mt-2">
              <button className="w-[100px] h-[40px] bg-pink-500 rounded-xl text-white cursor-pointer hover:bg-pink-600">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
