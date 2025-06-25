import axios from 'axios';

const instance = axios.create({
  withCredentials: true
});

if (typeof window !== 'undefined') {
  const xsrfToken = getCookie('XSRF-TOKEN');
  if (xsrfToken) {
    instance.defaults.headers.common['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
  }
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export default instance;
