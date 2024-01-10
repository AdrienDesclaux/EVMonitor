type fetchAPI_EVMonitorProps = {
  route: string;
  method: string;
};

export default async function fetchAPI_EVMonitor<tPayload>(
  { route, method }: fetchAPI_EVMonitorProps,
  payload: tPayload
) {
  console.log(route, method, payload);
  return await fetch(`http://localhost:3000${route}`, {
    headers: { 'Content-type': 'application/json' },
    method,
    credentials: 'include',
    body: method === 'post' ? JSON.stringify(payload) : null
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) throw data.error;
      return data;
    })
    .catch((e) => {
      throw e;
    });
}
