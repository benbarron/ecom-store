import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import ContentWrapper from './content-wrapper';
import ProductDisplay from './global/product-display';
import SimilarProducts from './global/similar-products';

interface Props extends RouteComponentProps<{ id: string }> {}

const ProductPage: FC<Props> = (props: Props) => {
  return (
    <ContentWrapper showSidebar={true}>
      <div className='container product-page'>
        <ProductDisplay productId={props.match.params.id} />
        <SimilarProducts productId={props.match.params.id} />
      </div>
    </ContentWrapper>
  );
};

export default ProductPage;
