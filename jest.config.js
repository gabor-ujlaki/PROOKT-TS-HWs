//const { createDefaultPreset } = require("ts-jest");
//
//const tsJestTransformCfg = createDefaultPreset().transform;

///** @type {import("jest").Config} **/
//module.exports = {
//  testEnvironment: "node",
//  transform: {
//    ...tsJestTransformCfg,
//  },
//};

/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json'
    }
  },
  testMatch: [
    '<rootDir>/HW-01/**/*.test.ts',
    '<rootDir>/HW-02/**/*.test.ts',
    '<rootDir>/HW-03/**/*.test.ts'
  ]
};
