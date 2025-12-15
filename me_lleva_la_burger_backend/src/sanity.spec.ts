describe('Backend Sanity', () => {
  it('should pass a basic truthy check', () => {
    expect(true).toBe(true);
  });

  it('should be able to perform valid math', () => {
    expect(100 + 200).toBe(300);
  });
});
