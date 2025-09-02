import { card } from '@kurocado-studio/ui-kit-domain';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

import { MotionElement, type MotionElementProperties } from '../motion';

export type CardProperties<
  T extends keyof React.JSX.IntrinsicElements = 'div',
> = MotionElementProperties<T>;

function CardHeader<T extends keyof React.JSX.IntrinsicElements = 'div'>({
  children,
  className,
  ...rest
}: CardProperties<T>): React.JSX.Element {
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
}: CardProperties<T>): React.ReactNode {
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
}: CardProperties<T>): React.ReactNode {
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
}: CardProperties<T>): React.ReactNode {
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
