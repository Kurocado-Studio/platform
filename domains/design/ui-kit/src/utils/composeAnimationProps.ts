import { get } from 'lodash-es';

export const composeAnimationProps = (
  props: unknown,
): Record<string, unknown> => {
  return {
    animate: get(props, ['animate']),
    initial: get(props, ['initial']),
    exit: get(props, ['exit']),
    whileHover: get(props, ['whileHover']),
    whileTap: get(props, ['whileTap']),
    whileFocus: get(props, ['whileFocus']),
    variants: get(props, ['variants']),
    transition: get(props, ['transition']) as TransitionEvent,
  };
};
