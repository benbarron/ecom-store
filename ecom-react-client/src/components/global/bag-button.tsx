import React, { FC, Fragment } from 'react';
import { useAddToCart } from '../../utils/hooks';
import * as Spinners from 'react-spinners';

interface Props {
  productId: string;
}

const BagButton: FC<Props> = (props: Props) => {
  const cartMutation = useAddToCart();

  const onClick = (e: any) => {
    e.preventDefault();
    cartMutation.mutate(props.productId);
  };

  return (
    <button
      className='wmt-btn-primary-sm'
      disabled={cartMutation.isLoading}
      onClick={onClick}
    >
      Add to Bag{' '}
      {cartMutation.isLoading && (
        <Spinners.ClipLoader size={14} color={'#fff'} />
      )}
      {!cartMutation.isLoading && <i className='fas fa-shopping-bag ml-3'></i>}
    </button>
  );
};

export default BagButton;
