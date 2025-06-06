import { get } from 'lodash-es';

import type { ValidityStateProps } from '../types';

export const composeAriaValidityState = (
  validityStateProps?: Partial<ValidityStateProps>,
): ValidityStateProps => {
  return {
    ...validityStateProps,
    badInput: get(validityStateProps, ['badInput'], false),
    customError: get(validityStateProps, ['customError'], false),
    patternMismatch: get(validityStateProps, ['patternMismatch'], false),
    rangeOverflow: get(validityStateProps, ['rangeOverflow'], false),
    rangeUnderflow: get(validityStateProps, ['rangeUnderflow'], false),
    stepMismatch: get(validityStateProps, ['stepMismatch'], false),
    tooLong: get(validityStateProps, ['tooLong'], false),
    tooShort: get(validityStateProps, ['tooShort'], false),
    typeMismatch: get(validityStateProps, ['typeMismatch'], false),
    valid: get(validityStateProps, ['valid'], true),
    valueMissing: get(validityStateProps, ['valueMissing'], false),
  };
};
