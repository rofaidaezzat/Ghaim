
const ProductSkeleton = () => {
    return (
        <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 animate-pulse">
                {/* Image Placeholder */}
            </div>

            <div className="p-5 flex flex-col flex-grow">
                {/* Title Skeleton */}
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                
                {/* Category Skeleton */}
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-1/2"></div>
                
                <div className="mt-auto flex items-center justify-between mb-4">
                    {/* Price Skeleton */}
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3"></div>
                </div>

                {/* Button Skeleton */}
                <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
