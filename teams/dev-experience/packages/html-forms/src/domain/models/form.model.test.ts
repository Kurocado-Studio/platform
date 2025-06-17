import { type Mock, vi } from 'vitest';

import { Form } from './form.model';
import { FormSection } from './formSection.model';

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mock-uuid-123'),
}));

vi.mock('./formSection.model', () => ({
  FormSection: {
    create: vi.fn(),
  },
}));

describe('Form', () => {
  const mockFormSection = {
    id: 'section-1',
    title: 'Test Section',
  } as FormSection;

  beforeEach(() => {
    vi.clearAllMocks();
    (FormSection.create as Mock).mockReturnValue(mockFormSection);
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create form with default values when no payload provided', () => {
    const form = Form.create();

    expect(form.id).toBe('mock-uuid-123');
    expect(form.title).toBe('Untitled Form');
    expect(form.description).toBe('No description.');
    expect(form.sections).toEqual([]);
    expect(form.createdAt).toBe('2024-01-01T00:00:00.000Z');
    expect(form.updatedAt).toBe('2024-01-01T00:00:00.000Z');
  });

  it('should create form with provided values', () => {
    const payload = {
      id: 'custom-id',
      title: 'Custom Form',
      description: 'Custom description',
      createdAt: '2023-12-01T00:00:00.000Z',
      updatedAt: '2023-12-02T00:00:00.000Z',
    };

    const form = Form.create(payload);

    expect(form.id).toBe('custom-id');
    expect(form.title).toBe('Custom Form');
    expect(form.description).toBe('Custom description');
    expect(form.sections).toEqual([]);
    expect(form.createdAt).toBe('2023-12-01T00:00:00.000Z');
    expect(form.updatedAt).toBe('2023-12-02T00:00:00.000Z');
  });

  it('should create form sections using FormSection.create', () => {
    const sectionData = [
      FormSection.create({ id: 'section-1', title: 'Section 1' }),
      FormSection.create({ id: 'section-2', title: 'Section 2' }),
    ];

    const payload = {
      sections: sectionData,
    };

    const form = Form.create(payload);

    expect(FormSection.create).toHaveBeenCalledWith(sectionData[0]);
    expect(FormSection.create).toHaveBeenCalledWith(sectionData[1]);
    expect(form.sections).toEqual([mockFormSection, mockFormSection]);
  });

  it('should handle partial payload with some undefined values', () => {
    const payload = {
      title: 'Partial Form',
      sections: [FormSection.create({ id: 'section-1' })],
    };

    const form = Form.create(payload);

    expect(form.id).toBe('mock-uuid-123');
    expect(form.title).toBe('Partial Form');
    expect(form.description).toBe('No description.');
    expect(form.sections).toEqual([mockFormSection]);
    expect(form.createdAt).toBe('2024-01-01T00:00:00.000Z');
    expect(form.updatedAt).toBe('2024-01-01T00:00:00.000Z');
  });

  it('should handle empty sections array', () => {
    const payload = {
      sections: [],
    };

    const form = Form.create(payload);

    expect(form.sections).toEqual([]);
    expect(FormSection.create).not.toHaveBeenCalled();
  });

  it('should implement IFormSection interface', () => {
    const form = Form.create();

    expect(form).toHaveProperty('id');
    expect(form).toHaveProperty('title');
    expect(form).toHaveProperty('description');
    expect(form).toHaveProperty('sections');
    expect(form).toHaveProperty('createdAt');
    expect(form).toHaveProperty('updatedAt');

    expect(typeof form.id).toBe('string');
    expect(typeof form.title).toBe('string');
    expect(typeof form.description).toBe('string');
    expect(Array.isArray(form.sections)).toBe(true);
    expect(typeof form.createdAt).toBe('string');
    expect(typeof form.updatedAt).toBe('string');
  });

  it('should create new instance each time', () => {
    const form1 = Form.create();
    const form2 = Form.create();

    expect(form1).not.toBe(form2);
    expect(form1.id).toBe(form2.id);
  });

  it('should handle undefined sections gracefully', () => {
    const payloadWithNull = {
      sections: undefined,
    };

    const form = Form.create(payloadWithNull);

    expect(form.sections).toEqual([]);
    expect(FormSection.create).not.toHaveBeenCalled();
  });
});
