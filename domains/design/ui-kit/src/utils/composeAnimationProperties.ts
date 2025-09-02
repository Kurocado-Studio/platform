import { get } from 'lodash-es';

export const composeAnimationProperties = (
  properties: unknown,
): Record<string, unknown> => {
  return {
    animate: get(properties, ['animate']),
    initial: get(properties, ['initial']),
    exit: get(properties, ['exit']),
    whileHover: get(properties, ['whileHover']),
    whileTap: get(properties, ['whileTap']),
    whileFocus: get(properties, ['whileFocus']),
    variants: get(properties, ['variants']),
    transition: get(properties, ['transition']) as TransitionEvent,
  };
};
