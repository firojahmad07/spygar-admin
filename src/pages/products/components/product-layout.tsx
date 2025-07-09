import { PageNavbar } from '@/pages/account';

import { useSettings } from '@/providers/settings-provider';
import { Container } from '@/components/common/container';
import { AccountEnterpriseContent } from './account-basic-content';
import { Outlet } from 'react-router';

import {
    CompanyProfile,
} from './blocks';

const ProductLayout = () => {
  return (
    <>
      <PageNavbar />
      <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
                <div className="col-span-2">
                    <CompanyProfile />
                </div>
                <div className="col-span-2 lg:col-span-2 flex">
                    <Outlet />
                </div>                
            </div>
      </Container>
    </>
  );
}

export {ProductLayout}
