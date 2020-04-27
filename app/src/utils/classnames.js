// @flow

type ClassnamesUtilsType = {
  add: (cn: string) => number,
  remove: (cn: string) => string[],
  build: () => string,
};

export default (classes: string): ClassnamesUtilsType => {
  let classNames = [...classes.split(' ')] || classes.split(' ');

  return {
    add: cn => classNames.push(cn),
    remove: cn => classNames = classNames.filter(className => className !== cn),
    build: () => classNames.join(' ')
  };
};
