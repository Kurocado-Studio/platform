import { get } from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';

import { QuestionType } from '../enums/question.enum';
import type { QuestionMap } from '../types/questionMap.types';
import { TextField } from './text.model';

export interface IQuestion {
  id: string;
  formId: string;
  type: QuestionType;
  order: number;
  name: string;
  variants: QuestionMap;
  createdAt: string;
  updatedAt: string;
}

export class Question implements IQuestion {
  createdAt: string;
  formId: string;
  id: string;
  name: string;
  order: number;
  type: QuestionType;
  updatedAt: string;
  variants: QuestionMap;

  private constructor(payload?: Partial<IQuestion>) {
    this.createdAt = get(payload, ['createdAt'], new Date().toISOString());
    this.formId = get(payload, ['formId'], 'unknown');
    this.name = get(payload, ['name'], 'Unknown');
    this.id = get(payload, ['id'], uuidv4());
    this.order = get(payload, ['order'], 0);
    this.type = get(payload, ['type'], QuestionType.TEXT_FIELD);
    this.updatedAt = get(payload, ['updatedAt'], new Date().toISOString());
    this.variants = get(payload, ['variants'], {
      [QuestionType.TEXT_FIELD]: TextField.create(),
    });
  }

  public static create = (payload?: Partial<IQuestion>): IQuestion => {
    return new Question(payload);
  };
}
