import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductInfo from "../../components/product/ProductInfo";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-red-600">Неверный ID продукта</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <ProductImageGallery productId={productId} />
          </div>
          <div>
            <ProductInfo productId={productId} />
          </div>
        </div>
        <div className="space-y-12">
          <section>
            {/* Дополнительные секции можно добавить здесь */}
          </section>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}