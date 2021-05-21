import axios, { AxiosResponse } from 'axios';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  useDeleteFromCart,
  useFetchCart,
  useUpdateCartQty,
} from '../../utils/hooks';
import { Product } from '../../utils/interfaces';

interface Props extends RouteComponentProps {
  setSidebar: (v: 'item' | 'cart') => void;
}

type CartItem<T = string> = { qty: number; date: number; item: Product<T> };

const CartSidebar: FC<Props> = (props: Props) => {
  const query = useFetchCart();
  const deleteMutation = useDeleteFromCart();
  const updateMutation = useUpdateCartQty();

  return (
    <div className='cart-sidebar'>
      <div className='header'>
        <h4>Cart</h4>
        <h5>
          {query.isFetched && query.isSuccess ? query.data.products.length : 0}{' '}
          items
        </h5>
      </div>
      <div className='item-list'>
        {query.isFetching || query.isError || !query.data.products.length ? (
          <div className='row mt-5 d-flex justify-content-center'>
            <h5 className='text-center'>Your cart is currently empty.</h5>
            <button className='wmt-btn-default-sm'>Add from My Items</button>
          </div>
        ) : (
          query.data.products
            .sort((a: CartItem, b: CartItem) => (a.date > b.date ? 1 : -1))
            .map((product: CartItem) => (
              <div className='row product-item' key={product.item.id}>
                <div className='product-image-wrapper'>
                  <img
                    src={product.item.image}
                    onClick={(e) =>
                      props.history.push(`/product/${product.item.id}`)
                    }
                    alt=''
                  />
                </div>
                <div className='product-info-wrapper'>
                  <p>
                    <span
                      className='name'
                      onClick={(e) =>
                        props.history.push(`/product/${product.item.id}`)
                      }
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
                      <input
                        className='qty-value'
                        disabled
                        value={product.qty}
                      />
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
            ))
        )}
      </div>
      <div className='footer'>
        <div className='subtotal'>
          <h5>
            Subtotal{' '}
            <b>${query.isFetched && query.isSuccess ? query.data.total : 0}</b>
          </h5>
        </div>
        <div className='checkout'>
          <button className='wmt-btn-primary'>Check out</button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CartSidebar);
