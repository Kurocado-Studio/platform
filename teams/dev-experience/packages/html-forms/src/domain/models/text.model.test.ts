import { vi } from 'vitest';

import { TextType } from '../enums/text.enum';
import { TextField } from './text.model';

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mock-uuid-text-123'),
}));

describe('TextField', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create text field with default values when no payload provided', () => {
    const textField = TextField.create();

    expect(textField.id).toBe('mock-uuid-text-123');
    expect(textField.label).toBe('');
    expect(textField.name).toBe('');
    expect(textField.type).toBe(TextType.TEXT);
    expect(textField.defaultValue).toBeUndefined();
    expect(textField.description).toBeUndefined();
    expect(textField.maxLength).toBeUndefined();
    expect(textField.minLength).toBeUndefined();
    expect(textField.placeholder).toBeUndefined();
    expect(textField.readOnly).toBeUndefined();
    expect(textField.required).toBeUndefined();
    expect(textField.visible).toBeUndefined();
  });

  it('should create text field with provided values', () => {
    const payload = {
      id: 'custom-text-id',
      label: 'Custom Label',
      name: 'customName',
      type: TextType.EMAIL,
      defaultValue: 'default text',
      description: 'Field description',
      maxLength: 100,
      minLength: 5,
      placeholder: 'Enter text here',
      readOnly: true,
      required: true,
      visible: false,
    };

    const textField = TextField.create(payload);

    expect(textField.id).toBe('custom-text-id');
    expect(textField.label).toBe('Custom Label');
    expect(textField.name).toBe('customName');
    expect(textField.type).toBe(TextType.EMAIL);
    expect(textField.defaultValue).toBe('default text');
    expect(textField.description).toBe('Field description');
    expect(textField.maxLength).toBe(100);
    expect(textField.minLength).toBe(5);
    expect(textField.placeholder).toBe('Enter text here');
    expect(textField.readOnly).toBe(true);
    expect(textField.required).toBe(true);
    expect(textField.visible).toBe(false);
  });

  it('should handle partial payload with some undefined values', () => {
    const payload = {
      label: 'Partial Label',
      name: 'partialName',
      required: true,
      placeholder: 'Partial placeholder',
    };

    const textField = TextField.create(payload);

    expect(textField.id).toBe('mock-uuid-text-123');
    expect(textField.label).toBe('Partial Label');
    expect(textField.name).toBe('partialName');
    expect(textField.type).toBe(TextType.TEXT);
    expect(textField.required).toBe(true);
    expect(textField.placeholder).toBe('Partial placeholder');
    expect(textField.defaultValue).toBeUndefined();
    expect(textField.description).toBeUndefined();
    expect(textField.maxLength).toBeUndefined();
    expect(textField.minLength).toBeUndefined();
    expect(textField.readOnly).toBeUndefined();
    expect(textField.visible).toBeUndefined();
  });

  it('should handle different text types', () => {
    const emailField = TextField.create({ type: TextType.EMAIL });
    const passwordField = TextField.create({ type: TextType.PASSWORD });
    const textField = TextField.create({ type: TextType.TEXT });

    expect(emailField.type).toBe(TextType.EMAIL);
    expect(passwordField.type).toBe(TextType.PASSWORD);
    expect(textField.type).toBe(TextType.TEXT);
  });

  it('should handle boolean values correctly', () => {
    const payload = {
      required: false,
      readOnly: false,
      visible: true,
    };

    const textField = TextField.create(payload);

    expect(textField.required).toBe(false);
    expect(textField.readOnly).toBe(false);
    expect(textField.visible).toBe(true);
  });

  it('should handle numeric values for length constraints', () => {
    const payload = {
      minLength: 0,
      maxLength: 0,
    };

    const textField = TextField.create(payload);

    expect(textField.minLength).toBe(0);
    expect(textField.maxLength).toBe(0);
  });

  it('should handle large numeric values', () => {
    const payload = {
      minLength: 1000,
      maxLength: 5000,
    };

    const textField = TextField.create(payload);

    expect(textField.minLength).toBe(1000);
    expect(textField.maxLength).toBe(5000);
  });

  it('should handle empty string values', () => {
    const payload = {
      label: '',
      name: '',
      defaultValue: '',
      description: '',
      placeholder: '',
    };

    const textField = TextField.create(payload);

    expect(textField.label).toBe('');
    expect(textField.name).toBe('');
    expect(textField.defaultValue).toBe('');
    expect(textField.description).toBe('');
    expect(textField.placeholder).toBe('');
  });

  it('should implement ITextField interface', () => {
    const textField = TextField.create();

    // Check that all required properties exist
    expect(textField).toHaveProperty('id');
    expect(textField).toHaveProperty('label');
    expect(textField).toHaveProperty('name');
    expect(textField).toHaveProperty('type');

    // Check property types
    expect(typeof textField.id).toBe('string');
    expect(typeof textField.label).toBe('string');
    expect(typeof textField.name).toBe('string');
    expect(Object.values(TextType)).toContain(textField.type);
  });

  it('should create new instance each time', () => {
    const textField1 = TextField.create();
    const textField2 = TextField.create();

    expect(textField1).not.toBe(textField2);
    expect(textField1.id).toBe(textField2.id); // Same mock UUID
  });

  it('should handle null values gracefully', () => {
    const payload = {
      label: null as any,
      name: null as any,
      defaultValue: null as any,
    };

    const textField = TextField.create(payload);

    expect(textField.label).toBeNull();
    expect(textField.name).toBeNull();
    expect(textField.defaultValue).toBeNull();
  });

  it('should override defaults with Object.assign', () => {
    const payload = {
      label: 'Override Label',
      name: 'overrideName',
      type: TextType.PASSWORD,
      customProperty: 'custom value',
    };

    const textField = TextField.create(payload);

    expect(textField.label).toBe('Override Label');
    expect(textField.name).toBe('overrideName');
    expect(textField.type).toBe(TextType.PASSWORD);
    expect((textField as any).customProperty).toBe('custom value');
  });

  it('should handle all optional properties', () => {
    const payload = {
      defaultValue: 'test default',
      description: 'test description',
      label: 'test label',
      maxLength: 50,
      minLength: 1,
      name: 'testName',
      placeholder: 'test placeholder',
      readOnly: true,
      required: false,
      type: TextType.EMAIL,
      visible: true,
    };

    const textField = TextField.create(payload);

    Object.keys(payload).forEach((key) => {
      expect(textField).toHaveProperty(key);
      expect((textField as any)[key]).toBe((payload as any)[key]);
    });
  });
});
