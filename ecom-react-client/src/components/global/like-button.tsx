import React, { FC } from 'react';
import { useLikeProduct } from '../../utils/hooks';
import * as Spinners from 'react-spinners';

interface Props {
  productId: string;
}

const LikeButton: FC<Props> = (props: Props) => {
  const mutation = useLikeProduct();

  const onClick = (e: any) => {
    e.preventDefault();
    mutation.mutate(props.productId);
  };

  return (
    <button
      className='wmt-btn-default-sm'
      disabled={mutation.isLoading}
      onClick={onClick}
    >
      Like Item{' '}
      {mutation.isLoading && <Spinners.ClipLoader size={14} color={'#fff'} />}
      {!mutation.isLoading && <i className='fas fa-heart ml-3'></i>}
    </button>
  );
};

export default LikeButton;
