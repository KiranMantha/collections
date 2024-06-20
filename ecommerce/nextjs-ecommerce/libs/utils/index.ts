export const round2 = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;
export const getEnvVariable = <T>(variable: string) => process.env[variable] as T;
