import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import ProductDisplay from './global/product-display';
import SimilarProducts from './global/similar-products';

interface Props extends RouteComponentProps<{ id: string }> {}

const ProductPage: FC<Props> = (props: Props) => {
  return (
    <div className='container product-page'>
      <ProductDisplay productId={props.match.params.id} />
      <SimilarProducts productId={props.match.params.id} />
    </div>
  );
};

export default ProductPage;
