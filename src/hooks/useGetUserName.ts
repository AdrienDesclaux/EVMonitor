import fetchAPI_EVMonitor from './fetchAPI_EVMonitor';

export default async function useGetUserName(): Promise<string | undefined> {
  const fetchParamsUserName = {
    route: '/user',
    method: 'get'
  };
  const payloadEmpty: null = null;
  try {
    const dataAPI = await fetchAPI_EVMonitor(fetchParamsUserName, payloadEmpty);
    const userName = await dataAPI.user.username;
    return userName;
  } catch (error) {
    console.error(error);
  }
}
