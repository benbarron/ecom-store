import axios, { AxiosResponse } from 'axios';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import * as Spinners from 'react-spinners';
import { useAddToCart, useFindSingleProduct } from '../../utils/hooks';
import BagButton from './bag-button';
import LikeButton from './like-button';

interface Props {
  productId: string;
}

const ProductDisplay: FC<Props> = (props: Props) => {
  const query = useFindSingleProduct(props.productId);
  const cartMutation = useAddToCart();

  if (query.isLoading) {
    return (
      <div className='loader-wrapper'>
        <Spinners.ClipLoader size={150} color={'#0076dc'} />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className='d-flex justify-content-center mt-5'>
        <h6>
          We are sorry for the inconvienence, but we enountered an error while
          fetching the product information.{' '}
        </h6>
        <button className='wmt-btn-default-sm' onClick={(e) => query.refetch()}>
          Try again.
        </button>
      </div>
    );
  }

  return (
    <div className='row current-product'>
      <div className='col-sm-12 col-lg-4 product-image-wrapper'>
        <img src={query.data?.product.image} alt='' />
      </div>
      <div className='col-sm-12 col-lg-8'>
        <div className='product-info-wrapper'>
          <h5 className='product-name'>{query.data?.product.name}</h5>
          <h5 className='product-manufacturer'>
            Made by {query.data?.product.manufacturer}
          </h5>
          <h5 className='product-price'>${query.data?.product.price}</h5>
          <p>{query.data?.product.description}</p>
        </div>
        <div className='product-action-wrapper'>
          <BagButton productId={props.productId} />
          <LikeButton productId={props.productId} />
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
