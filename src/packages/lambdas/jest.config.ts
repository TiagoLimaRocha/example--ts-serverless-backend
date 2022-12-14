/* eslint-disable */
export default {
  displayName: 'lambdas',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/lambdas',
  collectCoverageFrom: [
    'src/handlers/user/create/**/*.ts',
    'src/repositories/user/**/*.ts',
  ],
};
