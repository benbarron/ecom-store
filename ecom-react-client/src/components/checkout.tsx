import React, { FC, Fragment } from 'react';
import {
  useDeleteFromCart,
  useFetchCart,
  useUpdateCartQty,
} from '../utils/hooks';
import * as Spinners from 'react-spinners';
import { RouteComponentProps, withRouter } from 'react-router';
import { Product } from '../utils/interfaces';
import ContentWrapper from './content-wrapper';

interface Props extends RouteComponentProps {}

type CartItem<T = string> = { qty: number; date: number; item: Product<T> };

const CheckoutPage: FC<Props> = (props: Props) => {
  const query = useFetchCart();
  const deleteMutation = useDeleteFromCart();
  const updateMutation = useUpdateCartQty();

  const LoadingSpinner = () => (
    <div className='loader-wrapper'>
      <Spinners.ClipLoader size={150} color={'#0076dc'} />
    </div>
  );

  const ErrorMessage = () => (
    <div className='d-flex text-center justify-content-center mt-5 flex-column'>
      <h5>
        We are sorry for the inconvienence, but we enountered an error while
        fetching your cart.{' '}
      </h5>
      <button
        className='wmt-btn-default-sm mx-auto mt-4'
        onClick={(e) => query.refetch()}
      >
        Try again.
      </button>
    </div>
  );

  const ProductList = () => (
    <Fragment>
      <h5>Order Summary</h5>
      <div className='item-list'>{query.data.products.map(SingleProduct)}</div>
    </Fragment>
  );

  const SingleProduct = (product: CartItem) => (
    <div className='row product-item' key={product.item.id}>
      <div className='product-image-wrapper'>
        <img
          src={product.item.image}
          onClick={(e) => props.history.push(`/product/${product.item.id}`)}
          alt=''
        />
      </div>
      <div className='product-info-wrapper'>
        <p>
          <span
            className='name'
            onClick={(e) => props.history.push(`/product/${product.item.id}`)}
          >
            {' '}
            {product.item.name}
          </span>
          {' - '}
          <span className='price'>
            ${product.item.price} {product.qty > 1 && 'each'}
          </span>{' '}
        </p>
        <div className='actions'>
          <button
            className='wmt-btn-default-xs'
            onClick={(e) => deleteMutation.mutate(product.item.id)}
          >
            Remove
          </button>
          <div className='update-qty-wrapper'>
            <button
              className='dec-btn'
              onClick={(e) =>
                updateMutation.mutate({
                  productId: product.item.id,
                  qty: product.qty - 1,
                })
              }
            >
              -
            </button>
            <input className='qty-value' disabled value={product.qty} />
            <button
              className='inc-btn'
              onClick={(e) =>
                updateMutation.mutate({
                  productId: product.item.id,
                  qty: product.qty + 1,
                })
              }
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const OrderTotals = () => (
    <div className='order-totals'>
      <hr />
      <div className='total-row'>
        <span className='price-label'>Sub-Total</span>
        <span className='price-value'>$ {query.data.total}</span>
      </div>
      <div className='total-row'>
        <span className='price-label'>Tax</span>
        <span className='price-value'>$ {query.data.tax}</span>
      </div>
      <div className='total-row'>
        <span className='price-label'>Total</span>
        <span className='price-value'>$ {query.data.total}</span>
      </div>
    </div>
  );

  const ShippingInformation = () => (
    <div className='shipping-information'>
      <h5>Shipping Information</h5>
      <form className='form' onSubmit={(e) => e.preventDefault()}>
        <div className='row'>
          <input type='text' name='address' placeholder='Street address' />
        </div>
        <div className='row'>
          <input type='text' name='state' placeholder='Street address' />
        </div>
      </form>
    </div>
  );

  return (
    <ContentWrapper showSidebar={false}>
      <div className='container checkout-wrapper'>
        <div className='row'>
          <div className='col-sm-12 col-md-6'>{ShippingInformation()}</div>
          <div className='col-sm-12 col-md-6'>
            {query.isLoading && LoadingSpinner()}
            {query.isError && ErrorMessage()}
            {query.isFetched && ProductList()}
            {query.isFetched && OrderTotals()}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default withRouter(CheckoutPage);
