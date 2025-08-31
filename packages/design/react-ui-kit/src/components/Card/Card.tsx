import {card} from '@kurocado-studio/ui-kit-domain';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

// export const card = {
//   cardComponentWrapperClasses:
//       'JHHJHJHJJH w-full bg-card-root-bg-default dark:bg-black text-card-root-fg-default dark:text-gray-100 dark:divide-gray-700 divide-gray-200 divide-y overflow-hidden rounded-card-root-radius-default border-2 border-gray-200 dark:border-gray-800',
//   cardHeaderClasses:
//       'w-full bg-card-root-bg-default dark:bg-black text-card-root-fg-default dark:text-gray-100 p-card-root-padding-default',
//   cardBodyClasses:
//       'w-full bg-card-root-bg-default dark:bg-black text-card-root-fg-default dark:text-gray-100 p-card-root-padding-default',
//   cardFooterClasses:
//       'w-full bg-card-root-bg-default dark:bg-black text-card-root-fg-default dark:text-gray-100 p-card-root-padding-default',
// };

import { MotionElement, type MotionElementProps } from '../motion';

export type CardProps<T extends keyof React.JSX.IntrinsicElements = 'div'> =
  MotionElementProps<T>;

function CardHeader<T extends keyof React.JSX.IntrinsicElements = 'div'>({
  children,
  className,
  ...rest
}: CardProps<T>): React.JSX.Element {
  return (
    <MotionElement<T>
      className={twMerge(card.cardHeaderClasses, className)}
      {...rest}
    >
      {children}
    </MotionElement>
  );
}

function CardFooter<T extends keyof React.JSX.IntrinsicElements = 'div'>({
  children,
  className,
  ...rest
}: CardProps<T>): React.ReactNode {
  return (
    <MotionElement<T>
      className={twMerge(card.cardFooterClasses, className)}
      {...rest}
    >
      {children}
    </MotionElement>
  );
}

function CardBody<T extends keyof React.JSX.IntrinsicElements = 'div'>({
  children,
  className,
  ...rest
}: CardProps<T>): React.ReactNode {
  return (
    <MotionElement<T>
      className={twMerge(card.cardBodyClasses, className)}
      {...rest}
    >
      {children}
    </MotionElement>
  );
}

export function Card<T extends keyof React.JSX.IntrinsicElements = 'div'>({
  children,
  className,
  ...rest
}: CardProps<T>): React.ReactNode {

  return (
    <MotionElement<T>
      className={twMerge(card.cardComponentWrapperClasses, className)}
      {...rest}
    >
      {children}
    </MotionElement>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
