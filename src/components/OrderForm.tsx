'use client';

import CartSection from '@/components/cart/CartSection';
import DesignTool from '@/components/design/DesignTool';
import CustomerFields from '@/components/checkout/CustomerFields';
import NotesField from '@/components/checkout/NotesField';
import OrderTotals from '@/components/checkout/OrderTotals';
import PaymentMethods from '@/components/checkout/PaymentMethods';
import PlaceOrderButton from '@/components/checkout/PlaceOrderButton';
import OrderSuccessDialog from '@/components/checkout/OrderSuccessDialog';
import { usePlaceOrder } from '@/components/checkout/usePlaceOrder';

/**
 * One DOM for both layouts:
 * - mobile: a single flex column; the <aside> uses `display: contents`
 *   so its blocks interleave with the cart through `order-*`;
 * - desktop (xl): three columns — cart, design tool, order summary.
 */
export default function OrderForm() {
  const placeOrder = usePlaceOrder();

  return (
    <>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          placeOrder();
        }}
        className="mx-auto mt-6 flex max-w-2xl flex-col gap-7 xl:mt-4 xl:grid xl:max-w-none xl:grid-cols-[minmax(0,38fr)_minmax(0,50fr)_minmax(0,30fr)] xl:items-start xl:gap-6"
      >
        <CartSection className="order-2 xl:order-none" />

        <DesignTool className="hidden xl:mt-[34px] xl:grid" />

        <aside aria-labelledby="summary-heading" className="contents xl:block xl:space-y-4">
          <h2
            id="summary-heading"
            className="hidden w-fit rounded-tr-md border-2 border-b-0 border-ink bg-paper-dark px-3 py-1 font-display text-xl uppercase leading-none xl:block"
          >
            Order summary
          </h2>
          <div className="contents xl:-mt-4 xl:block xl:space-y-4 xl:border-t-2 xl:border-ink xl:pt-3">
            <CustomerFields className="order-1" />
            <NotesField className="order-4" />
            <OrderTotals className="hidden border-t-2 border-ink pt-2 xl:block" />
            <PaymentMethods className="order-3" />
            <PlaceOrderButton className="order-5" />
          </div>
        </aside>
      </form>
      <OrderSuccessDialog />
    </>
  );
}
