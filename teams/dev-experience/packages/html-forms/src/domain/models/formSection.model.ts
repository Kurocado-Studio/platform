import { get } from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';

import { type IQuestion, Question } from './question.model';

export interface IFormSection {
  id: string;
  title: string;
  description?: string;
  order: number;
  questions: Array<IQuestion>;
}

export class FormSection implements IFormSection {
  id: string;
  title: string;
  description?: string;
  order: number;
  questions: Array<IQuestion>;

  private constructor(payload: Partial<IFormSection> = {}) {
    this.id = get(payload, ['id'], uuidv4());
    this.title = get(payload, ['title'], 'Unknown');
    this.description = get(payload, ['description'], 'No description.');
    this.order = get(payload, ['order'], 0);
    this.questions = get(payload, ['questions'], []).map(
      (question: IQuestion) => Question.create(question),
    );
  }

  public static create(payload?: Partial<IFormSection>): IFormSection {
    return new FormSection(payload);
  }
}
