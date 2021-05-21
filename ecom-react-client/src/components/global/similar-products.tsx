import React, { FC, Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useSearchSimilarProducts } from '../../utils/hooks';
import { Product } from '../../utils/interfaces';

interface Props extends RouteComponentProps {
  productId: string;
}

const SimilarProducts: FC<Props> = (props: Props) => {
  const query = useSearchSimilarProducts(props.productId);

  if (query.isFetching) {
    return <Fragment />;
  }

  return (
    <div>
      <div className='row similar-products'>
        <h1>Similar Products</h1>
        {query.data
          ?.filter((p: Product) => p.id.raw !== props.productId)
          .map((product: Product) => (
            <div
              onClick={(e) => props.history.push(`/product/${product.id.raw}`)}
              key={product.id.raw}
              className='small-product-display col-sm-6 col-md-3 col-lg-2'
            >
              <img src={product.image.raw} alt='' />
              <h5 className='product-name'>{product.name.raw}</h5>
              <h5 className='product-price'>${product.price.raw}</h5>
            </div>
          ))}
      </div>
    </div>
  );
};

export default withRouter(SimilarProducts);
