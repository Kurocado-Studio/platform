import { get } from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';

import { FormSection, type IFormSection } from './formSection.model';

export interface IForm {
  id: string;
  title: string;
  description: string;
  sections: Array<IFormSection>;
  createdAt: string;
  updatedAt: string;
}

export class Form implements IForm {
  id: string;
  title: string;
  description: string;
  sections: Array<IFormSection>;
  createdAt: string;
  updatedAt: string;

  private constructor(payload: Partial<IForm> = {}) {
    this.id = get(payload, ['id'], uuidv4());
    this.title = get(payload, ['title'], 'Untitled Form');
    this.description = get(payload, ['description'], 'No description.');
    this.sections = get(payload, ['sections'], []).map(
      (formSection: IFormSection) => FormSection.create(formSection),
    );
    this.createdAt = get(payload, ['createdAt'], new Date().toISOString());
    this.updatedAt = get(payload, ['updatedAt'], new Date().toISOString());
  }

  public static create(payload?: Partial<IForm>): IForm {
    return new Form(payload);
  }
}
