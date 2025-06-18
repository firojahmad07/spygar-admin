import { Container } from '@/components/common/container';
import { UsersData } from './UsersData';
import {useState, useEffect} from 'react';
import apiFetcher from '@/fetcher/apiFetcher';
import { AxiosResponse } from "axios"


export interface User {
  id: string;
  name: string;
  // add more fields as needed
}

export interface UsersResponse {
  member: User[];
  view: {
    page: number;
    totalPages: number;
    // any other pagination info
  };
}
import {
  PaginationState,
} from '@tanstack/react-table';

const Users = () => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });
  useEffect( () => {
    apiFetcher.get<UsersResponse, any>('/users')
      .then((responseData: AxiosResponse<UsersResponse, any>) => {
        setData(responseData.member);
        setPagination(responseData.view);
        console.log("loadUsersData : ", responseData);
      });
  }, []);

  return (
    <Container>
      <UsersData usersData={data}/>
    </Container>
  );
}

export { Users }
