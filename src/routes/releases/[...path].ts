import { useEffect } from 'react';

export default function Downloads() {
  useEffect(() => {
    const path = window.location.pathname.replace('/releases/', '');
    window.location.href = `https://your-vercel-project-url/${path}`;
  }, []);

  return null;
}
