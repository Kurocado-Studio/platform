// import {
//   cardBodyClasses,
//   cardComponentWrapperClasses,
//   cardFooterClasses,
//   cardHeaderClasses,
// } from '@kurocado-studio/ui-kit-domain';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

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
      className={twMerge( className)}
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
      className={twMerge( className)}
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
      className={twMerge( className)}
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
      className={twMerge( className)}
      {...rest}
    >
      {children}
    </MotionElement>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
