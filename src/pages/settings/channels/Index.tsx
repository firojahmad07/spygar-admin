import { Container } from '@/components/common/container';
import { ChannelsData } from './ChannelsData';
import {useState, useEffect} from 'react';



const ChannelsIndex = () => {
  return (
    <Container>
      <ChannelsData/>
    </Container>
  );
}

export { ChannelsIndex }
