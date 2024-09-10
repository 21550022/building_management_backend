module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],  // Chấp nhận các đuôi file
  rootDir: '.',                                // Thư mục gốc của dự án
  testRegex: '.*\\.spec\\.ts$',                // Regex để tìm các file kiểm thử (.spec.ts)
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',                // Sử dụng ts-jest để biên dịch TypeScript
  },
  collectCoverageFrom: ['**/*.(t|j)s'],        // Thu thập thông tin kiểm thử từ các file TS hoặc JS
  coverageDirectory: './coverage',             // Đường dẫn lưu báo cáo coverage
  testEnvironment: 'node',                     // Môi trường kiểm thử
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',          // Ánh xạ alias 'src/' tới đường dẫn thực tế
  },
};
