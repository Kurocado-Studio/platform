import { type Mock, vi } from 'vitest';

import { QuestionType } from '../enums/question.enum';
import type { QuestionMap } from '../types/questionMap.types';
import { Question } from './question.model';
import { TextField } from './text.model';

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mock-uuid-789'),
}));

vi.mock('./text.model', () => ({
  TextField: {
    create: vi.fn(),
  },
}));

describe('Question', () => {
  const mockTextField = TextField.create({
    id: '234',
    placeholder: 'Enter text',
  });

  beforeEach(() => {
    vi.clearAllMocks();
    (TextField.create as Mock).mockReturnValue(mockTextField);
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create question with default values when no payload provided', () => {
    const question = Question.create();

    expect(question.id).toBe('mock-uuid-789');
    expect(question.formId).toBe('unknown');
    expect(question.type).toBe(QuestionType.TEXT_FIELD);
    expect(question.order).toBe(0);
    expect(question.name).toBe('Unknown');
    expect(question.createdAt).toBe('2024-01-01T00:00:00.000Z');
    expect(question.updatedAt).toBe('2024-01-01T00:00:00.000Z');
    expect(question.variants).toEqual({
      [QuestionType.TEXT_FIELD]: mockTextField,
    });
    expect(TextField.create).toHaveBeenCalledTimes(1);
  });

  it('should create question with provided values', () => {
    const customVariants: QuestionMap = {
      [QuestionType.TEXT_FIELD]: mockTextField,
    };

    const payload = {
      id: 'custom-question-id',
      formId: 'form-123',
      type: QuestionType.TEXT_FIELD,
      order: 5,
      name: 'Custom Question',
      variants: customVariants,
      createdAt: '2023-12-01T00:00:00.000Z',
      updatedAt: '2023-12-02T00:00:00.000Z',
    };

    const question = Question.create(payload);

    expect(question.id).toBe('custom-question-id');
    expect(question.formId).toBe('form-123');
    expect(question.type).toBe(QuestionType.TEXT_FIELD);
    expect(question.order).toBe(5);
    expect(question.name).toBe('Custom Question');
    expect(question.variants).toBe(customVariants);
    expect(question.createdAt).toBe('2023-12-01T00:00:00.000Z');
    expect(question.updatedAt).toBe('2023-12-02T00:00:00.000Z');
  });

  it('should handle partial payload with some undefined values', () => {
    const payload = {
      name: 'Partial Question',
      formId: 'form-456',
      order: 3,
    };

    const question = Question.create(payload);

    expect(question.id).toBe('mock-uuid-789');
    expect(question.formId).toBe('form-456');
    expect(question.type).toBe(QuestionType.TEXT_FIELD);
    expect(question.order).toBe(3);
    expect(question.name).toBe('Partial Question');
    expect(question.createdAt).toBe('2024-01-01T00:00:00.000Z');
    expect(question.updatedAt).toBe('2024-01-01T00:00:00.000Z');
    expect(question.variants).toEqual({
      [QuestionType.TEXT_FIELD]: mockTextField,
    });
  });

  it('should handle zero order value', () => {
    const payload = {
      order: 0,
    };

    const question = Question.create(payload);

    expect(question.order).toBe(0);
  });

  it('should handle negative order values', () => {
    const payload = {
      order: -1,
    };

    const question = Question.create(payload);

    expect(question.order).toBe(-1);
  });

  it('should handle different question types', () => {
    const payload = {
      type: QuestionType.TEXT_FIELD,
    };

    const question = Question.create(payload);

    expect(question.type).toBe(QuestionType.TEXT_FIELD);
  });

  it('should create default variants when variants not provided', () => {
    const question = Question.create();

    expect(TextField.create).toHaveBeenCalledWith();
    expect(question.variants).toEqual({
      [QuestionType.TEXT_FIELD]: mockTextField,
    });
  });

  it('should not create default variants when variants are provided', () => {
    const customVariants: QuestionMap = {
      [QuestionType.TEXT_FIELD]: mockTextField,
    };

    const payload = {
      variants: customVariants,
    };

    const question = Question.create(payload);

    expect(question.variants).toBe(customVariants);
  });

  it('should implement IQuestion interface', () => {
    const question = Question.create();

    // Check that all required properties exist
    expect(question).toHaveProperty('id');
    expect(question).toHaveProperty('formId');
    expect(question).toHaveProperty('type');
    expect(question).toHaveProperty('order');
    expect(question).toHaveProperty('name');
    expect(question).toHaveProperty('variants');
    expect(question).toHaveProperty('createdAt');
    expect(question).toHaveProperty('updatedAt');

    // Check property types
    expect(typeof question.id).toBe('string');
    expect(typeof question.formId).toBe('string');
    expect(Object.values(QuestionType)).toContain(question.type);
    expect(typeof question.order).toBe('number');
    expect(typeof question.name).toBe('string');
    expect(typeof question.variants).toBe('object');
    expect(typeof question.createdAt).toBe('string');
    expect(typeof question.updatedAt).toBe('string');
  });

  it('should create new instance each time', () => {
    const question1 = Question.create();
    const question2 = Question.create();

    expect(question1).not.toBe(question2);
    expect(question1.id).toBe(question2.id); // Same mock UUID
  });

  it('should handle empty string values', () => {
    const payload = {
      name: '',
      formId: '',
    };

    const question = Question.create(payload);

    expect(question.name).toBe('');
    expect(question.formId).toBe('');
  });

  it('should handle null/undefined values gracefully', () => {
    const payload = {
      name: undefined,
      formId: undefined,
      order: undefined,
    };

    const question = Question.create(payload);

    expect(question.name).toBe('Unknown');
    expect(question.formId).toBe('unknown');
    expect(question.order).toBe(0);
  });
});
