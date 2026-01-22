import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/products";
import { ArrowLeft, ShoppingCart, Minus, Plus, Ruler, X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import ImageWithFallback from "../Components/ImageWithFallback";
import sizeGuideImage from "../assets/size_guide.png";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selections, setSelections] = useState<{size: string, color: string}[]>([{size: "", color: ""}]);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });

  const product = data?.data;

  const [isAdded, setIsAdded] = useState(false);

  // Update selections array when quantity changes
  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => {
        const newQuantity = Math.max(1, prev + delta);
        setSelections(currentSelections => {
            const newSelections = [...currentSelections];
            if (newQuantity > currentSelections.length) {
                // Add new empty selections
                for (let i = currentSelections.length; i < newQuantity; i++) {
                    newSelections.push({size: "", color: ""});
                }
            } else if (newQuantity < currentSelections.length) {
                // Remove last selections
                return newSelections.slice(0, newQuantity);
            }
            return newSelections;
        });
        return newQuantity;
    });
  };

  const handleSelectionChange = (index: number, field: 'size' | 'color', value: string) => {
    setSelections(prev => {
        const newSelections = [...prev];
        newSelections[index] = { ...newSelections[index], [field]: value };
        return newSelections;
    });
  };

  const areAllSelectionsComplete = () => {
    if (!product) return false;
    const hasSizes = product.sizes && product.sizes.length > 0;
    const hasColors = product.colors && product.colors.length > 0;

    return selections.every(sel => 
        (!hasSizes || sel.size) && (!hasColors || sel.color)
    );
  };

  const handleAddToCart = () => {
    if (!product || !areAllSelectionsComplete()) return;

    // Dispatch for each selection
    selections.forEach(sel => {
        dispatch(addToCart({ 
            product, 
            quantity: 1, 
            selectedSize: sel.size, 
            selectedColor: sel.color 
        }));
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product || !areAllSelectionsComplete()) return;
    
    // Dispatch for each selection
    selections.forEach(sel => {
         dispatch(addToCart({ 
            product, 
            quantity: 1, 
            selectedSize: sel.size, 
            selectedColor: sel.color 
        }));
    });

    navigate("/order");
  };


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Product not found
        </h2>
        <Link
          to="/shop"
          className="text-white bg-primary px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/shop"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2 rtl:rotate-180" />
          Back to Shop
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="p-8 bg-gray-100 flex flex-col items-center justify-center">
              <div className="aspect-[3/4] w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg mb-4">
                <ImageWithFallback
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 w-full max-w-md">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      currentImageIndex === idx
                        ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-secondary font-bold uppercase tracking-wider text-sm">
                      {product.category}
                    </span>
                    <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-2">
                      {product.name}
                    </h1>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-lg">
                    EGP {product.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {product.description}
                </p>

                 {/* Quantity Selector - Moved to Top */}
                  <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                      Quantity (Items to Purchase)
                    </h3>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="p-2 rounded-full border border-gray-200 hover:bg-white hover:border-gray-300 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-2xl font-bold w-12 text-center text-primary">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="p-2 rounded-full border border-gray-200 hover:bg-white hover:border-gray-300 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                {/* Per-Item Selection Loop */}
                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {selections.map((selection, index) => (
                        <div key={index} className="p-5 border border-gray-200 rounded-xl relative">

                            <div className="absolute -top-3 left-4 rtl:left-auto rtl:right-4 bg-white px-2 text-sm font-bold text-primary flex items-center gap-2">
                                <span>Item #{index + 1}</span>
                            </div>
                            
                            {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Select Size
                                    </h3>
                                    {/* Size Guide Trigger */}
                                    <button
                                      type="button"
                                      onClick={() => setShowSizeGuide(true)}
                                      className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors group"
                                      title="Open Size Guide"
                                    >
                                      <Ruler className="w-4 h-4" />
                                      <span className="underline decoration-secondary underline-offset-2 group-hover:decoration-primary transition-all">Size Guide</span>
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                {product.sizes
                                    .flatMap((s) => s.split(",").map((i) => i.trim()))
                                    .filter(Boolean)
                                    .map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => handleSelectionChange(index, 'size', size)}
                                        className={`min-w-[2.5rem] h-10 px-3 flex items-center justify-center rounded-md border text-xs font-bold transition-all duration-200 ${
                                          selection.size === size
                                            ? "border-primary bg-primary text-white shadow-md scale-105"
                                            : "border-gray-200 text-gray-600 hover:border-gray-400 bg-white"
                                        }`}
                                    >
                                        {size.toUpperCase()}
                                    </button>
                                    ))}
                                </div>
                            </div>
                            )}
                            
                            {product.colors && product.colors.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Select Color
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => handleSelectionChange(index, 'color', color)}
                                        className={`min-w-[2.5rem] h-10 px-3 flex items-center justify-center rounded-md border text-xs font-bold transition-all duration-200 ${
                                          selection.color === color
                                            ? "border-primary bg-primary text-white shadow-md scale-105"
                                            : "border-gray-200 text-gray-600 hover:border-gray-400 bg-white"
                                        }`}
                                    >
                                        {color}
                                    </button>
                                    ))}
                                </div>
                            </div>
                            )}
                        </div>
                    ))}
                </div>

              </div>

              <div className="border-t border-gray-100 pt-8 mt-8 space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!areAllSelectionsComplete() || isAdded}
                  className={`w-full py-4 rounded-full text-white font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                    (!areAllSelectionsComplete())
                      ? "bg-gray-300 cursor-not-allowed"
                      : isAdded 
                        ? "bg-green-600 shadow-none scale-95"
                        : "bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6" />
                      Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!areAllSelectionsComplete()}
                  className={`w-full py-4 rounded-full text-white font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                    (!areAllSelectionsComplete())
                      ? "bg-secondary/50 cursor-not-allowed"
                      : "bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-1"
                  }`}
                >
                  Buy Now
                </button>

                {!areAllSelectionsComplete() && (
                    <p className="text-red-500 text-sm mt-3 text-center">
                      Please select all options for each item to continue
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold text-gray-900">Size Guide</h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 overflow-auto bg-gray-50 flex items-center justify-center min-h-[300px]">
              <div className="relative w-full h-full max-h-[70vh] flex items-center justify-center">
                 <img
                    src={sizeGuideImage}
                    alt="Size Guide Reference"
                    className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
                  />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
