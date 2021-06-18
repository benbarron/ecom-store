import React, { FC } from 'react';
import ContentWrapper from './content-wrapper';
import * as Spinners from 'react-spinners';

interface Props {}

const FallbackPage: FC<Props> = (props: Props) => {
  return (
    <ContentWrapper showSidebar={false}>
      <div className='loader-wrapper'>
        <Spinners.ClipLoader size={150} color={'#0076dc'} />
      </div>
    </ContentWrapper>
  );
};

export default FallbackPage;
