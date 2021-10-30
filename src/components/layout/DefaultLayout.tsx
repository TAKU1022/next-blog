import { ReactNode, VFC } from 'react';
import CommonHeader from '../ui/CommonHeader';

type Props = {
  children: ReactNode;
};

const DefaultLayout: VFC<Props> = (props: Props) => {
  const { children } = props;

  return (
    <>
      <CommonHeader />
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
