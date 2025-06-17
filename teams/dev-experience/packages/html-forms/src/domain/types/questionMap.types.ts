import type { QuestionType } from '../enums/question.enum';
import type { ITextField } from '../models/text.model';

export interface QuestionMap {
  [QuestionType.TEXT_FIELD]?: ITextField;
}
