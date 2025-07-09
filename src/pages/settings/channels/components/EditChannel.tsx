import { Fragment, useState} from 'react';
import { Container } from '@/components/common/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserHero } from '@/partials/common/user-hero';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Navbar, NavbarActions } from '@/partials/navbar/navbar';

import PropertiesForm from './_blocks/PropertiesForm'


import {
  Mail,
  MapPin,
  Zap,
} from 'lucide-react';

const EditChannel = () => {
  const [channel, setChannel] = useState();
  const image = (
      <img
        src={toAbsoluteUrl('/media/avatars/300-1.png')}
        className="rounded-full border-3 border-green-500 size-[100px] shrink-0"
        alt="image"
      />
    );

  return (
    <Fragment>
      <UserHero
        name="Jenny Klabber"
        image={image}
        info={[
          { email: 'jenny@kteam.com', icon: Mail },
          { label: 'Created', icon: Zap, data: "12 july 2025" },
          { label: 'Last Logged In', icon: MapPin, data: "25 july 2025" },
        ]}
      />
      <Container>
          
          <Tabs defaultValue="1">
            <TabsList className="justify-left px-5 mb-2.5" variant="line" >
              <div className="flex items-center gap-5">
                <TabsTrigger value="1">Properties</TabsTrigger>
                <TabsTrigger value="2">Translations</TabsTrigger>
              </div>
            </TabsList>
            <TabsContent value="1">
              <PropertiesForm />
            </TabsContent>
            <TabsContent value="2">
              <h1>hesafasdf 2</h1>
            </TabsContent>
          </Tabs>
      </Container>
    </Fragment>
  );
};

export { EditChannel };
