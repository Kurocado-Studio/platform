import * as matchers from 'vitest-axe/matchers';
import '@testing-library/jest-dom/vitest';
import '@kurocado-studio/qa/web/setup';
import '@testing-library/jest-dom';
import 'vitest-axe/extend-expect';

expect.extend(matchers);
