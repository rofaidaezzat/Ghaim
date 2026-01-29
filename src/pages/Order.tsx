import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store/store";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useState } from "react";
import { createOrder, type CreateOrderPayload, type OrderItem } from "../api/orders";
import toast from 'react-hot-toast';
import ImageWithFallback from "../Components/ImageWithFallback";
import { getShippingCost, SHIPPING_RATES } from "../data/shippingRates";

const Order = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rawCartItems = useSelector((state: RootState) => state.cart.items);
    const cartItems = Array.isArray(rawCartItems) ? rawCartItems : [];
    
    // Import cities directly or use the one we created. 
    // For simplicity in this replace, I'll inline a few major ones or use the file if imported.
    // Let's assume we import EGYPTIAN_CITIES from ../data/cities or just define it here to be safe and self-contained if the file creation wasn't perfect, 
    // but better to use the file if I can. I'll rely on the import.
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "", 
        city: "",
        district: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [shippingCost, setShippingCost] = useState(0);


    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    const total = subtotal + shippingCost;

    // Fetch shipping when city changes
    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const city = e.target.value;
        const shipping = getShippingCost(city);
        setShippingCost(shipping);
        setFormData(prev => ({ ...prev, city }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.city) {
            toast.error("Select City");
            return;
        }

        setIsSubmitting(true);

        try {
            const groupedItemsMap = new Map<string, OrderItem>();

            cartItems.forEach(item => {
                const productId = item.product._id;
                
                if (!groupedItemsMap.has(productId)) {
                    groupedItemsMap.set(productId, {
                        product: productId,
                        variations: []
                    });
                }

                const group = groupedItemsMap.get(productId)!;
                group.variations.push({
                    quantity: item.quantity,
                    size: item.selectedSize || "Default", 
                    color: item.selectedColor || "Default" 
                });
            });

            const payload: CreateOrderPayload = {
                userInfo: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone
                },
                cartItems: Array.from(groupedItemsMap.values()),
                shippingAddress: {
                    city: formData.city,
                    district: formData.district,
                    details: formData.address
                }
            };
            
            // If backend accepts shipping/total override, we might add it here, 
            // but usually backend calculates. For now, we rely on the display.

            const response = await createOrder(payload);

            if (response.status === "success") {
                dispatch(clearCart());
                toast.success("Order created successfully!");
                // Navigate to Thank You page with details
                navigate('/thank-you', { 
                    state: { 
                        orderId: response.data?._id || "N/A", 
                        subtotal,
                        shippingCost,
                        total
                    } 
                }); 
            } else {
                toast.error("Failed to create order" + ": " + response.message);
            }

        } catch (error: any) {
            console.error("Order creation error:", error);
            toast.error("Failed to create order");
        } finally {            setIsSubmitting(false);
        }
    };

    // ... (Empty cart check remains the same, omitting for brevity in this replace block if possible, but I need to replace the whole component to be safe)
    if (cartItems.length === 0) {
         return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link
                    to="/shop"
                    className="bg-primary text-white px-8 py-3 rounded-full hover:bg-secondary hover:text-primary transition-colors flex items-center gap-2"
                >
                    Start Shopping <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart & Checkout</h1>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="lg:w-2/3 space-y-4">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {cartItems.map((item, idx) => (
                                <div 
                                    key={`${item.product._id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                                    className="p-6 flex flex-col sm:flex-row items-center gap-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                                >
                                    <ImageWithFallback 
                                        src={item.product.images[0]} 
                                        alt={item.product.name} 
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    
                                    <div className="flex-grow text-center sm:text-left">
                                        <h3 className="font-bold text-gray-900">{item.product.name}</h3>
                                        <p className="text-sm text-gray-500 mb-1">{item.product.category}</p>
                                        <div className="flex gap-2 mt-1">
                                            {item.selectedSize && (
                                                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                                    Size: {item.selectedSize}
                                                </span>
                                            )}
                                            {item.selectedColor && item.selectedColor !== "Default" && (
                                                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                                    Color: {item.selectedColor}
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-2 font-bold text-primary">
                                            EGP {item.product.price.toFixed(2)}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => dispatch(updateQuantity({ productId: item.product._id, quantity: item.quantity - 1, selectedSize: item.selectedSize, selectedColor: item.selectedColor }))}
                                            className="p-1 rounded-full border border-gray-200 hover:bg-gray-100"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                        <button 
                                            onClick={() => dispatch(updateQuantity({ productId: item.product._id, quantity: item.quantity + 1, selectedSize: item.selectedSize, selectedColor: item.selectedColor }))}
                                            className="p-1 rounded-full border border-gray-200 hover:bg-gray-100"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button 
                                        onClick={() => dispatch(removeFromCart({ productId: item.product._id, selectedSize: item.selectedSize, selectedColor: item.selectedColor }))}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                            
                            <div className="space-y-3 mb-6 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>EGP {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{shippingCost > 0 ? `EGP ${shippingCost.toFixed(2)}` : 'Calculated at checkout'}</span>
                                </div>
                            </div>
                            
                            <div className="flex justify-between mb-8 text-xl font-bold text-gray-900 border-t pt-4">
                                <span>Total</span>
                                <span>EGP {total.toFixed(2)}</span>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="01xxxxxxxxx"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                         <select
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleCityChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                                        >
                                            <option value="">Select City</option>
                                            {Object.keys(SHIPPING_RATES).sort().map(city => (
                                                <option key={city} value={city}>{city} ({SHIPPING_RATES[city]} EGP)</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                        <input
                                            type="text"
                                            name="district"
                                            required
                                            value={formData.district}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                            placeholder="Maadi"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Details</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                        placeholder="Building, Street, Apartment"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full mt-6 bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? "Placing Order..." : "Place Order"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
