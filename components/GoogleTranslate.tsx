'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
          },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit: () => void;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    const googleTranslateScript = document.createElement('script');
    googleTranslateScript.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(googleTranslateScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en', // Language of your page
          includedLanguages: 'en,es,fr,de,zh-CN,ru,iw',
          // iw is Hebrew, zh-CN is Chinese, ru is Russian, fr is French, de is German, es is Spanish
        },
        'google_translate_element'
      );
    };

    return () => {
      document.body.removeChild(googleTranslateScript);
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      className="flex justify-center mt-10"
    ></div>
  );
}
