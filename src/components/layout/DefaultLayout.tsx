import { ReactNode, VFC } from 'react';
import { CommonFooter } from '../ui/CommonFooter';
import { CommonHeader } from '../ui/CommonHeader';

type Props = {
  children: ReactNode;
};

const DefaultLayout: VFC<Props> = (props: Props) => {
  const { children } = props;

  return (
    <>
      <CommonHeader />
      <main>{children}</main>
      <CommonFooter />
    </>
  );
};

export default DefaultLayout;
