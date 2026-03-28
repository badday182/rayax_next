'use client';
import Image from 'next/image';
import './banner.css';
import { useState } from 'react';

const Banner = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const closeBanner = () => {
    setIsBannerVisible(false);
  };
  return (
    <div
      className={`banner rounded-3 shadow-lg ${isBannerVisible ? '' : 'hidden'}`}
    >
      <button
        id='closeBanner'
        onClick={closeBanner}
        title='Закрити'
      >
        &times;
      </button>
      <div className='content d-flex flex-row align-items-center justify-content-center flex-wrap gap-3'>
        <div className='text-center d-flex flex-column align-items-center justify-content-center'>
          <p className='mb-0 fw-bold'>Подобається додаток?</p>
          <p className='mb-0'>Підтримайте розробника!</p>
        </div>
        <div className='d-flex flex-row align-items-center gap-3'>
          <div className='logo privat-logo mb-0'>
            <Image
              src='/PrivatBank.jpg'
              alt='ПриватБанк лого'
              fill
              objectFit='cover'
              className='rounded-circle'
            />
          </div>
          <div className='logo mono-logo mb-0'>
            <img
              src='https://asset.brandfetch.io/id-CBRc8NA/idEsOSs4jS.jpeg?updated=1674203441813'
              alt='Монобанк лого'
              width={50}
              height={50}
              className='rounded-circle'
            />
          </div>
        </div>
        {/* <span className='d-none d-sm-inline opacity-50 mx-2'>|</span> */}
        <div className='d-flex flex-row align-items-center gap-3'>
          <a
            className='logo youtube-logo m-0'
            href='https://www.youtube.com/@RayaX.project'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              className='m-0 rounded-circle'
              src='https://upload.wikimedia.org/wikipedia/commons/a/a0/YouTube_social_red_circle_%282017%29.svg'
              alt='Ютуб лого'
              width={50}
              height={50}
            />
          </a>
          <a
            className='logo telegram-logo m-0'
            href='https://t.me/Raya_X'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              className='m-0 rounded-circle'
              src='https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg'
              alt='Телеграм лого'
              width={50}
              height={50}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
