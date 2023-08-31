import { useEffect } from 'react';

export default function Downloads() {
  useEffect(() => {
    const path = window.location.pathname.replace('/releases/', '');
    const redirectUrl = `https://dlvr-teal.vercel.app/${path}`;

    window.location.href = redirectUrl;
  }, []);

  return null;
}
