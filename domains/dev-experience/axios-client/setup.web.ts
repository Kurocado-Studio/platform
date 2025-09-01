import '@kurocado-studio/qa/web/setup';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';
import * as matchers from 'vitest-axe/matchers';

expect.extend(matchers);
