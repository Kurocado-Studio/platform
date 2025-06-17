import React from 'react';

import type { IForm, IFormSection, IQuestion, QuestionMap } from '../../domain';
import { HtmlForm, type HtmlFormProps } from './HtmlForm';

export type IFormSectionRendererProps = {
  section: IFormSection;
  questionMap: QuestionMap;
  QuestionRenderer: React.FC<{
    question: IQuestion;
    questionMap: QuestionMap;
  }>;
};
export type IFormSectionRenderer = React.FC<IFormSectionRendererProps>;

export type IQuestionRendererProps = {
  question: IQuestion;
  questionMap: QuestionMap;
};
export type IQuestionRenderer = React.FC<IQuestionRendererProps>;

export type IRootFormRenderer = {
  formPayload: IForm;
  questionTypeMappings: QuestionMap;
  FormSectionRenderer: IFormSectionRenderer;
  QuestionRenderer: IQuestionRenderer;
} & HtmlFormProps;

export function FormRenderer(
  props: React.PropsWithChildren<IRootFormRenderer>,
): React.ReactNode {
  const {
    questionTypeMappings,
    formPayload,
    FormSectionRenderer,
    QuestionRenderer,
  } = props;
  return (
    <HtmlForm {...props}>
      {formPayload.sections
        .sort(
          (sectionA: IFormSection, sectionB: IFormSection) =>
            sectionA.order - sectionB.order,
        )
        .map((sectionProps: IFormSection) => (
          <FormSectionRenderer
            key={sectionProps.id}
            section={sectionProps}
            questionMap={questionTypeMappings}
            QuestionRenderer={QuestionRenderer}
          />
        ))}
    </HtmlForm>
  );
}
