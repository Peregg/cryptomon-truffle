import React from 'react';

import wording from 'constants/wording';

import pikaBanner from 'images/header-pika.jpg';

import 'styles/HookBanner.scss';

const HomeBanner = () => {
  return (
    <div className='hook-banner'>
        <div className='hook-banner-text'>
          <h1 className='hook-banner-title'>{wording.CRYPTOMON}</h1>
          <p className='hook-banner-phrase'>{wording.HOOK_BANNER_PHRASE}</p>
        </div>
      <img src={pikaBanner} alt='Pikachu' />
    </div>
  );
};

export default HomeBanner;
