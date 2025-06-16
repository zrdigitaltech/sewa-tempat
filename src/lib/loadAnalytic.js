export const loadScript = (url, id) => {
  if (!document.getElementById(id)) {
    const script = document.createElement('script');
    script.src = url;
    script.id = id;
    script.async = true;
    document.body.appendChild(script);
  }
};

export const loadJquery = () => {
  loadScript('/assets/js/vendor/jquery-3.3.1.min.js', 'jquery');
};

export const loadGoogleAnalytics = () => {
  loadScript('https://www.googletagmanager.com/gtag/js?id=G-8Z94W6TM1Y', 'ga'); // Replace G-XXXXXX with your GA ID
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-8Z94W6TM1Y'); // Replace G-8Z94W6TM1Y with your GA ID
};

export const loadGoogleTagManager = () => {
  loadScript('https://www.googletagmanager.com/gtm.js?id=GTM-59BFX4S', 'gtm'); // Replace GTM-XXXXXX with your GTM ID
};

export const loadFacebookPixel = () => {
  loadScript('https://connect.facebook.net/en_US/fbevents.js', 'fb-pixel');
  // Initialize Facebook Pixel
  window.fbq =
    window.fbq ||
    ((...args) => {
      if (!window.fbq.queue) window.fbq.queue = [];
      window.fbq.queue.push(args);
    });
  window.fbq('init', '488966464627479'); // Replace with your Facebook Pixel ID
  window.fbq('track', 'PageView');
};

export const loadTiktokPixel = () => {
  loadScript(
    'https://analytics.tiktok.com/i18n/pixel/sdk.js?sdkid=CQCCUQJC77U89M86NUT0',
    'tt-pixel'
  ); // Replace with your TikTok Pixel ID
};
export function loadStyle(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}
