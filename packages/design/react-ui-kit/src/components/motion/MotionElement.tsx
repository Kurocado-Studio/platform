import { type MotionProps, motion } from 'framer-motion';
import type React from 'react';

export type MotionElementProperties<
  Tag extends keyof React.JSX.IntrinsicElements,
> = React.JSX.IntrinsicElements[Tag] &
  MotionProps & {
    as?: Tag;
  };

export function MotionElement<
  Tag extends keyof React.JSX.IntrinsicElements = 'div',
>(properties: MotionElementProperties<Tag>): React.ReactNode {
  const { as = 'div', ...rest } = properties;
  const Component = motion[as as keyof React.ReactNode] as React.ElementType;
  return <Component {...rest} />;
}
