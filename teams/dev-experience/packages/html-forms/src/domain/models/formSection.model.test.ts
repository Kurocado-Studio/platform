import { type Mock, vi } from 'vitest';

import { FormSection } from './formSection.model';
import { Question } from './question.model';

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mock-uuid-456'),
}));

vi.mock('./question.model', () => ({
  Question: {
    create: vi.fn(),
  },
}));

describe('FormSection', () => {
  const mockQuestion = Question.create({
    id: 'question-1',
  });

  beforeEach(() => {
    vi.clearAllMocks();
    (Question.create as Mock).mockReturnValue(mockQuestion);
  });

  it('should create form section with default values when no payload provided', () => {
    const formSection = FormSection.create();

    expect(formSection.id).toBe('mock-uuid-456');
    expect(formSection.title).toBe('Unknown');
    expect(formSection.description).toBe('No description.');
    expect(formSection.order).toBe(0);
    expect(formSection.questions).toEqual([]);
  });

  it('should create form section with provided values', () => {
    const payload = {
      id: 'custom-section-id',
      title: 'Custom Section',
      description: 'Custom section description',
      order: 5,
    };

    const formSection = FormSection.create(payload);

    expect(formSection.id).toBe('custom-section-id');
    expect(formSection.title).toBe('Custom Section');
    expect(formSection.description).toBe('Custom section description');
    expect(formSection.order).toBe(5);
    expect(formSection.questions).toEqual([]);
  });

  it('should create questions using Question.create', () => {
    const questionData = [
      Question.create({ id: 'question-1', name: 'Question 1' }),
      Question.create({ id: 'question-2', name: 'Question 2' }),
    ];

    const payload = {
      questions: questionData,
    };

    const formSection = FormSection.create(payload);

    expect(Question.create).toHaveBeenCalledWith(questionData[0]);
    expect(Question.create).toHaveBeenCalledWith(questionData[1]);
    expect(formSection.questions).toEqual([mockQuestion, mockQuestion]);
  });

  it('should handle partial payload with some undefined values', () => {
    const payload = {
      title: 'Partial Section',
      order: 3,
      questions: [Question.create({ id: 'question-1' })],
    };

    const formSection = FormSection.create(payload);

    expect(formSection.id).toBe('mock-uuid-456');
    expect(formSection.title).toBe('Partial Section');
    expect(formSection.description).toBe('No description.');
    expect(formSection.order).toBe(3);
    expect(formSection.questions).toEqual([mockQuestion]);
  });

  it('should handle empty questions array', () => {
    const payload = {
      questions: [],
    };

    const formSection = FormSection.create(payload);

    expect(formSection.questions).toEqual([]);
    expect(Question.create).not.toHaveBeenCalled();
  });

  it('should handle undefined description', () => {
    const payload = {
      title: 'Section with undefined description',
      description: undefined,
    };

    const formSection = FormSection.create(payload);

    expect(formSection.description).toBe('No description.');
  });

  it('should handle zero order value', () => {
    const payload = {
      order: 0,
    };

    const formSection = FormSection.create(payload);

    expect(formSection.order).toBe(0);
  });

  it('should implement IFormSection interface', () => {
    const formSection = FormSection.create();

    // Check that all required properties exist
    expect(formSection).toHaveProperty('id');
    expect(formSection).toHaveProperty('title');
    expect(formSection).toHaveProperty('description');
    expect(formSection).toHaveProperty('order');
    expect(formSection).toHaveProperty('questions');

    // Check property types
    expect(typeof formSection.id).toBe('string');
    expect(typeof formSection.title).toBe('string');
    expect(typeof formSection.description).toBe('string');
    expect(typeof formSection.order).toBe('number');
    expect(Array.isArray(formSection.questions)).toBe(true);
  });

  it('should create new instance each time', () => {
    const formSection1 = FormSection.create();
    const formSection2 = FormSection.create();

    expect(formSection1).not.toBe(formSection2);
    expect(formSection1.id).toBe(formSection2.id); // Same mock UUID
  });

  it('should handle undefined questions gracefully', () => {
    const payloadWithNull = {
      questions: undefined,
    };

    const formSection = FormSection.create(payloadWithNull);

    expect(formSection.questions).toEqual([]);
    expect(Question.create).not.toHaveBeenCalled();
  });

  it('should handle negative order values', () => {
    const payload = {
      order: -1,
    };

    const formSection = FormSection.create(payload);

    expect(formSection.order).toBe(-1);
  });

  it('should handle large order values', () => {
    const payload = {
      order: 999,
    };

    const formSection = FormSection.create(payload);

    expect(formSection.order).toBe(999);
  });
});
