import * as crypto from 'crypto';

// Hash function that returns both hash and salt
export const hashWithSaltSHA256 = (value: string, saltLength: number = 16) => {
  const salt = crypto.randomBytes(saltLength).toString('hex');
  const hash = crypto
    .createHash('sha256')
    .update(value + salt)
    .digest('hex');

  return { hash, salt };
};

// Verification function that uses the same salt for hashing the input value
export const verifyHashSHA256 = (value: string, hash: string, salt: string) => {
  const hashToVerify = crypto
    .createHash('sha256')
    .update(value + salt)
    .digest('hex');

  console.log(hashToVerify);
  console.log(hash);

  return hashToVerify === hash;
};
