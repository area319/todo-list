import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ["/node_modules/"], 
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)


// /** @type {import('jest').Config} */

// const config = {
//     moduleFileExtensions: [
//       "ts",
//       "tsx",
//       "js"
//     ],
//     transform: {
//       "^.+\\.tsx?$": "ts-jest"
//     },
//     testMatch: [
//       "**/*.(test|spec).(ts|tsx)"
//     ],
//     globals: {
//       "ts-jest": {
//         "babelConfig": true,
//         "tsConfig": "jest.tsconfig.json"
//       }
//     },
//     coveragePathIgnorePatterns: [
//       "/node_modules/"
//     ],
//     "coverageReporters": [
//       "json",
//       "lcov",
//       "text",
//       "text-summary"
//     ],
//     "moduleNameMapper": {
//       "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/mocks.js",
//       "\\.(css|less)$": "<rootDir>/__mocks__/mocks.js"
//     }
// };

// module.exports = config;

