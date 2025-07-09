import { Fragment } from 'react';
import { PageNavbar } from '@/pages/account';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { Link } from 'react-router-dom';
import { useSettings } from '@/providers/settings-provider';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { AccountAppearanceContent } from './configuration-content';

export function ConfigurationPage() {
  const { settings } = useSettings();

  return (
    <Fragment>
      <PageNavbar />
      <Container>
        <AccountAppearanceContent />
      </Container>
    </Fragment>
  );
}
