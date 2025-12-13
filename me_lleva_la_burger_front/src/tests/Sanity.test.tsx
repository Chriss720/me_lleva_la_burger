import { describe, it, expect } from 'vitest';

describe('Frontend Sanity Checks', () => {
    it('true should be true', () => {
        expect(true).toBe(true);
    });

    it('basic math works', () => {
        expect(1 + 1).toBe(2);
    });
});
