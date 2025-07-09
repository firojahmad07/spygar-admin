import { Fragment} from 'react';
import { Container } from '@/components/common/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserHero } from '@/partials/common/user-hero';
import { toAbsoluteUrl } from '@/lib/helpers';
import {
  Mail,
  MapPin,
  Zap,
} from 'lucide-react';

const EditUser = () => {
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
                <TabsTrigger value="1">General Info</TabsTrigger>
                <TabsTrigger value="2">Aditional</TabsTrigger>
                <TabsTrigger value="3">Roles</TabsTrigger>
                <TabsTrigger value="4">Password</TabsTrigger>
              </div>
            </TabsList>
            <TabsContent value="1">
              <h1>adfasd 1</h1>
            </TabsContent>
            <TabsContent value="2">
              <h1>hesafasdf 2</h1>
            </TabsContent>
          </Tabs>

          {/* vertical tabs */}
          {/* <Tabs defaultValue="1" orientation="vertical" className="flex gap-6">
            <TabsList className="justify-between px-5 mb-2.5 flex flex-col space-y-2" variant="line" >
              <div className="flex items-center gap-5 flex-col">
                <TabsTrigger value="1">Mixed</TabsTrigger>
                <TabsTrigger value="2">Settings</TabsTrigger>
              </div>
            </TabsList>
            <TabsContent value="1">
              <h1>hesafasdf 1</h1>
            </TabsContent>
            <TabsContent value="2">
              <h1>hesafasdf 2</h1>
            </TabsContent>
          </Tabs> */}
      </Container>
    </Fragment>
  );
};

export { EditUser };
