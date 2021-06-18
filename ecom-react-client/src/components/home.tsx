import React, { FC } from 'react';
import ContentWrapper from './content-wrapper';

interface Props {}

const HomePage: FC<Props> = (props: Props) => {
  return (
    <ContentWrapper showSidebar={true}>
      <div></div>
    </ContentWrapper>
  );
};

export default HomePage;
