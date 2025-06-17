import { get } from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';

import { InputAutoCapitalize, TextType } from '../enums/text.enum';

export interface ITextField {
  autoCapitalize?: InputAutoCapitalize;
  defaultValue?: string;
  description?: string;
  id: string;
  label: string;
  maxLength?: number;
  minLength?: number;
  name: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  type: TextType;
  visible?: boolean;
}

export class TextField implements ITextField {
  label = '';
  name = '';
  id = '';
  type = TextType.TEXT;

  private constructor(payload?: Partial<ITextField>) {
    this.label = get(payload, ['label'], '');
    this.name = get(payload, ['name'], '');
    this.type = get(payload, ['type'], TextType.TEXT);

    Object.assign(this, {
      label: get(payload, ['label'], ''),
      name: get(payload, ['name'], ''),
      id: get(payload, ['id'], uuidv4()),
      type: get(payload, ['type'], TextType.TEXT),
      autoCapitalize: get(
        payload,
        ['autoCapitalize'],
        InputAutoCapitalize.NONE,
      ),
      ...payload,
    });
  }

  public static create(payload?: Partial<ITextField>): ITextField {
    return new TextField(payload);
  }
}
