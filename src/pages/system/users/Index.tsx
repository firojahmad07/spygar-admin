import { Container } from '@/components/common/container';
import { UsersData } from './UsersData';
import {useState, useEffect} from 'react';



const Users = () => {
  return (
    <Container>
      <UsersData/>
    </Container>
  );
}

export { Users }
