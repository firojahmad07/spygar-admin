import apiFetcher from '@/fetcher/apiFetcher';

const usersLoader = async () => {
    return await apiFetcher.get('/users');
}


export {usersLoader}