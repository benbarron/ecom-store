import React, { FC, Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import ContentWrapper from './content-wrapper';

interface Props extends RouteComponentProps {}

const AccountPage: FC<Props> = (props: Props) => {
  return (
    <Fragment>
      <ContentWrapper showSidebar={false}>
        <div></div>
      </ContentWrapper>
    </Fragment>
  );
};

export default withRouter(AccountPage);
