import { Fragment } from 'react';

import { Container } from '@/components/common/container';
import { PermissionsToggle } from './permissions-toggle';

export function CatalogMonitoring() {
  return (
    <Fragment>
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
            <PermissionsToggle />
        </div>
      </Container>
    </Fragment>
  );
}
