export const logErrorResponse = (errorData: unknown): void => {
  console.error(' [API Error Log]:', JSON.stringify(errorData, null, 2));
};
