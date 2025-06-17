import { render, screen } from '@kurocado-studio/qa/web';
import '@testing-library/jest-dom';
import { get } from 'lodash-es';
import React from 'react';

import {
  Form,
  FormSection,
  Question,
  QuestionType,
  TextField,
  TextType,
} from '../../domain';
import { DemoTextField } from '../text-field/components/DemoTextField';
import {
  FormRenderer,
  type IFormSectionRendererProps,
  type IQuestionRendererProps,
  type IRootFormRenderer,
} from './FormRenderer';

export const unitTestForm = Form.create({
  title: 'Newsletter Signup',
  sections: [
    FormSection.create({
      title: 'Contact Info',
      order: 0,
      questions: [
        Question.create({
          name: 'name',
          type: QuestionType.TEXT_FIELD,
          variants: {
            [QuestionType.TEXT_FIELD]: TextField.create({
              label: 'Your Name',
              type: TextType.TEXT,
              name: 'name',
              required: true,
              placeholder: 'First Name',
            }),
          },
        }),
        Question.create({
          name: 'email',
          type: QuestionType.TEXT_FIELD,
          variants: {
            [QuestionType.TEXT_FIELD]: TextField.create({
              label: 'Your Email',
              type: TextType.EMAIL,
              name: 'email',
              required: true,
              placeholder: 'you@example.com',
            }),
          },
        }),
      ],
    }),
  ],
});

function TestFormSectionRenderer({
  section,
  QuestionRenderer,
  questionMap,
}: IFormSectionRendererProps): React.ReactNode {
  return (
    <div>
      <h2>{section.title}</h2>
      {section.questions
        .sort((a, b) => a.order - b.order)
        .map((question) => (
          <QuestionRenderer
            key={question.id}
            question={question}
            questionMap={questionMap}
          />
        ))}
    </div>
  );
}

function TestQuestionRenderer(props: IQuestionRendererProps): React.ReactNode {
  const { question } = props;
  const variant = question.variants[question.type];
  if (!variant) return null;

  switch (question.type) {
    case QuestionType.TEXT_FIELD:
      return (
        <DemoTextField
          {...get(question, ['variants', QuestionType.TEXT_FIELD])}
        />
      );
    default:
      return null;
  }
}

const defaultProps: IRootFormRenderer = {
  formPayload: unitTestForm,
  questionTypeMappings: {},
  FormSectionRenderer: TestFormSectionRenderer,
  QuestionRenderer: TestQuestionRenderer,
};

describe('FormRenderer', () => {
  beforeEach(() => vi.resetAllMocks());

  it('renders the correct number of input fields', () => {
    render(<FormRenderer {...defaultProps} />);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(2);
  });
  ``;

  it('renders name input field', () => {
    render(<FormRenderer {...defaultProps} />);

    const nameInput = screen.getByLabelText('Your Name');
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute('name', 'name');
    expect(nameInput).toHaveAttribute('type', 'text');
    expect(nameInput).toHaveAttribute('placeholder', 'First Name');
    expect(nameInput).toBeRequired();
  });

  it('renders email input field', () => {
    render(<FormRenderer {...defaultProps} />);

    screen.debug();
    const emailInput = screen.getByLabelText('Your Email');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('name', 'email');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('placeholder', 'you@example.com');
    expect(emailInput).toBeRequired();
  });

  it('renders section title', () => {
    render(<FormRenderer {...defaultProps} />);

    expect(screen.getByText('Contact Info')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Contact Info' }),
    ).toBeInTheDocument();
  });

  it('renders input labels', () => {
    render(<FormRenderer {...defaultProps} />);

    expect(screen.getByText('Your Name')).toBeInTheDocument();
    expect(screen.getByText('Your Email')).toBeInTheDocument();
  });

  it('renders inputs with correct placeholders', () => {
    render(<FormRenderer {...defaultProps} />);

    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('renders both required inputs', () => {
    render(<FormRenderer {...defaultProps} />);

    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => {
      expect(input).toBeRequired();
    });
  });
});
