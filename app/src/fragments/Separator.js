import React from 'react';

import 'styles/Separator.scss';

type Props = {|
  className?: string,
|};

const Separator = ({ className }: Props): React$Element<'div'> => {
  return (
    <div className={className}>
      <span
        className='fading-separator'
      />
    </div>
  );
};

Separator.defaultProps = {
  className: 'fading-separator-container',
};

export default Separator;
