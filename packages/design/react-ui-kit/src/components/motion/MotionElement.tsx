// import { type MotionProps, motion } from 'framer-motion';
// import type React from 'react';
// export type MotionElementProps<T extends keyof HTMLElementTagNameMap = 'div'> =
//   MotionProps & { as?: T } & Partial<React.JSX.IntrinsicElements[T]>;
//
// export function MotionElement<T extends keyof HTMLElementTagNameMap>({
//   as,
//   ...props
// }: MotionElementProps<T>): React.ReactNode {
//   const element = as || 'div';
//
//   const Component: React.FC<MotionProps> =
//     motion[element as keyof React.ReactNode];
//
//   return <Component {...props} />;
// }
import { type MotionProps, motion } from 'framer-motion';
import type React from 'react';

// Utility: Merge JSX props + Motion props safely
export type MotionElementProps<Tag extends keyof React.JSX.IntrinsicElements> =
  React.JSX.IntrinsicElements[Tag] &
    MotionProps & {
      as?: Tag;
    };

export function MotionElement<
  Tag extends keyof React.JSX.IntrinsicElements = 'div',
>(props: MotionElementProps<Tag>): React.ReactNode {
  const { as = 'div', ...rest } = props;
  const Component = motion[as as keyof React.ReactNode] as React.ElementType;
  return <Component {...rest} />;
}
