export default function useStoreLoginInfo(logged: boolean, pseudo: string) {
  window.localStorage.setItem('logged', logged.toString());
  window.localStorage.setItem('user', pseudo);

  return;
}
