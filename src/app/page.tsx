import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import Footer from '@/components/layout/Footer';
import DecorFrame from '@/components/layout/DecorFrame';
import OrderForm from '@/components/OrderForm';

export default function Page() {
  return (
    <>
      <Header />
      <div className="relative mx-auto min-h-[calc(100vh-3rem)] max-w-[1440px] overflow-x-clip">
        <DecorFrame />
        <main className="relative px-4 xl:px-16">
          <Hero />
          <OrderForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
