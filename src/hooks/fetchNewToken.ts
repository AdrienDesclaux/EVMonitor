import fetchAPI_EVMonitor from './fetchAPI_EVMonitor';
export default async function fetchNewToken() {
  const fetchParamsUserName = {
    route: '/refresh_token',
    method: 'get'
  };
  const payloadEmpty: null = null;
  try {
    await fetchAPI_EVMonitor(fetchParamsUserName, payloadEmpty);
    return;
  } catch (error) {
    console.error(error);
  }
}
