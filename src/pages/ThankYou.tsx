import { useLocation, Link, Navigate } from "react-router-dom";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";


interface LocationState {
    orderId?: string;
    subtotal?: number;
    shipping?: {
        priceBeforeVat: number;
        vat: number;
        priceAfterVat: number;
    };
    total?: number;
    deliveryTime?: string;
}

const ThankYou = () => {

    const location = useLocation();
    const state = location.state as LocationState;

    if (!state) {
        return <Navigate to="/" replace />;
    }

    const { orderId, subtotal = 0, shipping, total = 0 } = state;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden"
            >
                <div className="bg-green-600 p-8 text-center text-white">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                    >
                        <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                    <p className="text-green-100">Your order has been placed successfully.</p>
                </div>

                <div className="p-8">
                    {orderId && orderId !== "N/A" && (
                        <div className="text-center mb-8">
                            <p className="text-gray-500 text-sm mb-1">Order Number</p>
                            <p className="text-xl font-mono font-bold text-gray-900 bg-gray-50 inline-block px-4 py-2 rounded-lg border border-gray-100">
                                #{orderId}
                            </p>
                        </div>
                    )}

                    <div className="space-y-4 border-b border-gray-100 pb-8 mb-8">
                        <h3 className="font-bold text-gray-900 mb-4">Payment Summary</h3>
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>EGP {subtotal.toFixed(2)}</span>
                        </div>
                        {shipping && (
                            <>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>EGP {shipping.priceBeforeVat.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>VAT ({(shipping.vat * 100).toFixed(0)}%)</span>
                                    <span>EGP {(shipping.priceAfterVat - shipping.priceBeforeVat).toFixed(2)}</span>
                                </div>
                            </>
                        )}
                        <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-100">
                            <span>Total Paid</span>
                            <span>EGP {total.toFixed(2)}</span>
                        </div>
                        {state.deliveryTime && (
                             <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center bg-blue-50 p-3 rounded-lg text-blue-700">
                                <span className="font-medium">Estimated Delivery</span>
                                <span className="font-bold">{state.deliveryTime}</span>
                            </div>
                        )}
                    </div>

                    <div className="text-center space-y-4">
                         <p className="text-gray-500 text-sm">
                             We've sent a confirmation email to your inbox with all the details.
                        </p>
                        <Link 
                            to="/shop"
                            className="block w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 group"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Continue Shopping
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ThankYou;
