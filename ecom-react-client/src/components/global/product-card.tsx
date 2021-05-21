import React, { FC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Product } from '../../utils/interfaces';
import BagButton from './bag-button';
import LikeButton from './like-button';

interface Props extends RouteComponentProps {
  product: Product;
}

const ProductCard: FC<Props> = (props: Props) => {
  return (
    <div className='product-card'>
      <div className='product-image-wrapper'>
        <img
          src={props.product.image.raw}
          alt=''
          onClick={(e) => {
            props.history.push(`/product/${props.product.id.raw}`);
          }}
        />
      </div>
      <div className='product-info-wrapper'>
        <h5
          className='product-name'
          onClick={(e) => {
            props.history.push(`/product/${props.product.id.raw}`);
          }}
        >
          {props.product.name.raw}
        </h5>
        <h5 className='product-manufacturer'>
          Made by {props.product.manufacturer.raw}
        </h5>
        <h5 className='product-price'>${props.product.price.raw}</h5>
        <p>{props.product.description.raw}</p>
        <div className='product-action-wrapper'>
          <BagButton productId={props.product.id.raw} />
          <LikeButton productId={props.product.id.raw} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductCard);
