import { useState } from "react"
import { addToCart, getCart, getTotal, removeFromCart } from "../../utils/cart"
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi"
import { Link } from "react-router-dom"

export default function CartPage(){
    const [cart,setCart] = useState(getCart())

    return(
        <div className="w-full max-w-full min-h-screen flex flex-col items-center pt-4 pb-24 md:pb-4 relative px-2 sm:px-4">
            <div className="z-40 hidden md:flex w-[90%] sm:w-[400px] lg:w-[450px] h-auto py-4 px-6 shadow-2xl rounded-lg bg-white absolute top-20 md:top-24 right-2 lg:right-4 flex-col justify-center items-center gap-2">
                <p className="text-xl lg:text-2xl text-secondary font-bold">Total: 
                    <span className="text-accent font-bold mx-2">
                        Rs. {getTotal().toFixed(2)}
                    </span>
                </p>
                <Link to="/checkout" state={
                    {
                        cart: cart,
                        
                    }
                } className="text-white bg-accent px-6 py-2 rounded-lg font-bold hover:bg-secondary transition-all duration-300 text-sm lg:text-base">
                    Checkout
                </Link>
            </div>
            {
                cart.map(
                    (item)=>{
                        return(
                            <div key={item.productId} className="w-full sm:w-[95%] md:w-[90%] lg:w-[700px] xl:w-[800px] max-w-4xl my-3 md:my-4 min-h-[200px] md:h-auto rounded-2xl md:rounded-tl-3xl md:rounded-bl-3xl bg-primary shadow-lg md:shadow-2xl flex flex-col md:flex-row relative justify-start md:justify-center items-center p-4 md:p-2 md:pt-0 gap-3 md:gap-0">
                                <img src={item.image} className="w-20 h-20 sm:w-24 sm:h-24 md:w-[100px] md:h-[100px] object-cover rounded-2xl md:rounded-3xl flex-shrink-0"/>
                                <div className="w-full md:w-[250px] lg:w-[300px] h-full flex flex-col justify-center items-center md:items-start md:pl-4">
                                    <h1 className="text-base sm:text-lg md:text-xl text-secondary font-semibold text-center md:text-left">{item.name}</h1>
                                    <h1 className="text-xs sm:text-sm md:text-md text-gray-600 font-semibold">{item.productId}</h1>
                                    {
                                        item.labelledPrice > item.price ?
                                        <div>
                                            <span className="text-sm md:text-md mx-1 text-gray-500 line-through">Rs. {item.labelledPrice.toFixed(2)}</span>
                                            <span className="text-sm md:text-md mx-1 font-bold text-accent">Rs. {item.price.toFixed(2)}</span>
                                        </div>
                                        :<span className="text-sm md:text-md mx-1 font-bold text-accent">Rs. {item.price.toFixed(2)}</span>
                                    }
                                </div>
                                <div className="w-full md:w-auto md:max-w-[120px] md:min-w-[100px] h-auto md:h-full flex flex-row justify-center md:justify-evenly items-center gap-2 md:gap-1">
                                    <button className="text-white font-bold rounded-lg md:rounded-xl hover:bg-secondary p-2 text-lg md:text-xl cursor-pointer aspect-square bg-accent"
                                    onClick={()=>{
                                        addToCart(item, -1)
                                        setCart(getCart())
                                    }}><BiMinus/></button>
                                    <h1 className="text-lg md:text-xl text-secondary font-semibold h-full flex items-center mx-2 md:mx-2.5 min-w-[30px] justify-center">{item.qty}</h1>
                                    <button className="text-white font-bold rounded-lg md:rounded-xl hover:bg-secondary p-2 text-lg md:text-xl cursor-pointer aspect-square bg-accent" onClick={()=>{
                                        addToCart(item , 1)
                                        setCart(getCart())
                                    }}><BiPlus/></button>                                
                                </div>
                                {/* total */}
                                <div className="w-full md:w-[180px] lg:w-[200px] h-full flex flex-col justify-center items-center md:items-end md:pr-4">
                                    <h1 className="text-lg sm:text-xl md:text-2xl text-secondary font-semibold">Rs. {(item.price*item.qty).toFixed(2)}</h1>
                                </div>
                                <button className="absolute text-red-600 cursor-pointer hover:bg-red-600 hover:text-white rounded-full p-2 top-2 right-2 md:top-auto md:right-[-35px] text-lg md:text-base" onClick={
                                    ()=>{
                                        removeFromCart(item.productId)
                                        setCart(getCart())
                                    }
                                }>
                                    <BiTrash/>
                                </button>
                            </div> 
                        )
                    }
                )
            }
            <div className="fixed bottom-0 left-0 z-50 md:hidden flex w-full h-auto py-4 px-4 shadow-2xl bg-white border-t-2 border-gray-200 flex-col justify-center items-center gap-2">
                <p className="text-lg sm:text-xl md:text-2xl text-secondary font-bold">Total: 
                    <span className="text-accent font-bold mx-2">
                        Rs. {getTotal().toFixed(2)}
                    </span>
                </p>
                <Link to="/checkout" state={
                    {
                        cart: cart
                    }
                } className="text-white bg-accent px-6 py-2.5 rounded-lg font-bold hover:bg-secondary transition-all duration-300 text-sm sm:text-base w-full sm:w-auto text-center">
                    Checkout
                </Link>
            </div>
        </div>
    )
}