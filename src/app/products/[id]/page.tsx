import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductInfo from "../../components/product/ProductInfo";
import FragranceNotes from "../../components/product/FragranceNotes";
import ReviewsSection from "../../components/product/ReviewsSection";
import { PRODUCT_DATA, REVIEWS_DATA } from "../../data/productsData";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: PageProps) {
  // Находим продукт по ID
  const product = PRODUCT_DATA.find(p => p.id === parseInt(params.id));
  
  // Если продукт не найден, показываем 404
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <ProductImageGallery images={product.images} />
          </div>
          <div>
            <ProductInfo productInfo={product} />
          </div>
        </div>
        <div className="space-y-12">
          <section>
            <FragranceNotes notes={product.notes} />
          </section>
          <section>
            <ReviewsSection/>
          </section>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}