import { ReactNode, VFC } from 'react';
import { CommonFooter } from '../ui/CommonFooter';
import { CommonHeader } from '../ui/CommonHeader';

type Props = {
  children: ReactNode;
};

const DefaultLayout: VFC<Props> = (props: Props) => {
  const { children } = props;

  return (
    <div className="wrapper">
      <CommonHeader />
      <main className="main">{children}</main>
      <CommonFooter />
    </div>
  );
};

export default DefaultLayout;
