import * as bcrypt from 'bcrypt';

export const hashValue = async (value: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(value, salt);
};

export const compareValues = async (
  value: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(value, hash);
};
