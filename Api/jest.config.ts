import type {Config} from 'jest';

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  extensionsToTreatAsEsm: ['.ts'],
  transformIgnorePatterns: ['/node_modules/(?!(foo|bar)/)', '/bar/'],
};

export default config;