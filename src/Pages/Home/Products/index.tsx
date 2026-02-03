import { useParams } from "react-router-dom";
import { supabase } from "../../../supabase";
import { useEffect, useState } from "react";
import { Product } from "../../../Components/Dashboard/Admin/Products/Type";
import DastresiFetures from "../../../Components/ProductSingle/DastresiFetures";
import Description from "../../../Components/ProductSingle/Description";
import SameCategory from "../../../Components/ProductSingle/SameCategory";
import Details from "../../../Components/ProductSingle/Details";

const ProductSingle = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id);
        if (error) throw error;
        if (data) setProduct(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading)
    return (
      <div className="w-[90%] max-w-[1200px] h-[920px] md:h-[610px] mx-auto bg-gray-200 animate-pulse rounded-2xl mb-12 mt-6" />
    );

  return (
    <div className="bg-[#FAFAFA] mt-18 lg:mt-0">
      <Details product={product[0]} />
      <DastresiFetures />
      <Description description={product[0].description} />
      <SameCategory categoryName={product[0].category} id={product[0].id} />
    </div>
  );
};

export default ProductSingle;
