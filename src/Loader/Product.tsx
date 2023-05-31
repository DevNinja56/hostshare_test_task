import React from "react";
import ContentLoader from "react-content-loader";

interface ProductLoaderProps {
  length?: number;
}

const ProductLoader: React.FC<ProductLoaderProps> = ({ length = 20 }) => (
  <>
    {Array.from({ length }).map((__, idx) => (
      <ContentLoader
        speed={2}
        width={300}
        height={400}
        viewBox="0 0 300 400"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        key={`prod-loader-${idx}`}
      >
        <rect x="0" y="0" rx="5" ry="5" width="300" height="300" /> // Carousel
        image placeholder
        <rect x="0" y="310" rx="5" ry="5" width="100" height="15" /> // City and
        country placeholder
        <rect x="0" y="335" rx="5" ry="5" width="30" height="15" /> // Rating
        placeholder
        <rect x="0" y="360" rx="5" ry="5" width="200" height="15" /> // Title
        placeholder
        <rect x="0" y="385" rx="5" ry="5" width="70" height="15" /> // Price
        placeholder
      </ContentLoader>
    ))}
  </>
);

export default ProductLoader;
