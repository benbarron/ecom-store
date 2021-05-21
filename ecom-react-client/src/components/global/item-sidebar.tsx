import React, { FC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  useAddToCart,
  useFetchedLikedProducts,
  useUnlikeProduct,
} from '../../utils/hooks';

interface Props extends RouteComponentProps {
  setSidebar: (v: 'item' | 'cart') => void;
}

const ItemSidebar: FC<Props> = (props: Props) => {
  const query = useFetchedLikedProducts();
  const unlikeMutation = useUnlikeProduct();
  const addToCartMutation = useAddToCart();

  return (
    <div className='item-sidebar'>
      <div className='header'>
        <h4>Liked items</h4>
        <h5>
          {query.isFetched && query.isSuccess ? query.data.length : 0} items
        </h5>
      </div>
      <div className='item-list'>
        {query.isFetching || query.isError || !query.data.length ? (
          <div className='row mt-5 d-flex justify-content-center'>
            <h5 className='text-center'>You haven't liked any products.</h5>
          </div>
        ) : (
          query.data.map((item: any) => (
            <div className='row product-item' key={item.id}>
              <div className='product-image-wrapper'>
                <img
                  src={item.image}
                  onClick={(e) => props.history.push(`/product/${item.id}`)}
                  alt=''
                />
              </div>
              <div className='product-info-wrapper'>
                <p>
                  <span
                    className='name'
                    onClick={(e) => props.history.push(`/product/${item.id}`)}
                  >
                    {' '}
                    {item.name}
                  </span>
                </p>
                <div className='actions'>
                  <button
                    className='wmt-btn-primary-xs mx-2'
                    onClick={async (e) => {
                      await addToCartMutation.mutateAsync(item.id);
                      await unlikeMutation.mutateAsync(item.id);
                      props.setSidebar('cart');
                    }}
                  >
                    Add to cart
                  </button>
                  <button
                    className='wmt-btn-default-xs'
                    onClick={(e) => unlikeMutation.mutate(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default withRouter(ItemSidebar);
