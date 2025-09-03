#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Cloud Service Crosswalk Tool setup...\n');

const checks = [
  {
    name: 'Root package.json',
    path: 'package.json',
    type: 'file'
  },
  {
    name: 'Frontend directory',
    path: 'frontend',
    type: 'directory'
  },
  {
    name: 'Backend directory', 
    path: 'backend',
    type: 'directory'
  },
  {
    name: 'Shared directory',
    path: 'shared',
    type: 'directory'
  },
  {
    name: 'Frontend package.json',
    path: 'frontend/package.json',
    type: 'file'
  },
  {
    name: 'Backend package.json',
    path: 'backend/package.json',
    type: 'file'
  },
  {
    name: 'Shared package.json',
    path: 'shared/package.json',
    type: 'file'
  },
  {
    name: 'Environment example files',
    path: 'backend/.env.example',
    type: 'file'
  },
  {
    name: 'Tailwind config',
    path: 'frontend/tailwind.config.js',
    type: 'file'
  },
  {
    name: 'TypeScript configs',
    path: 'frontend/tsconfig.json',
    type: 'file'
  },
  {
    name: 'Backend TypeScript config',
    path: 'backend/tsconfig.json',
    type: 'file'
  },
  {
    name: 'Database migration script',
    path: 'backend/src/scripts/migrate.ts',
    type: 'file'
  },
  {
    name: 'Database seed script',
    path: 'backend/src/scripts/seed.ts',
    type: 'file'
  },
  {
    name: 'Mock data service',
    path: 'backend/src/services/mockData.ts',
    type: 'file'
  },
  {
    name: 'Frontend components',
    path: 'frontend/src/components',
    type: 'directory'
  },
  {
    name: 'Backend routes',
    path: 'backend/src/routes',
    type: 'directory'
  },
  {
    name: 'API service',
    path: 'frontend/src/services/api.ts',
    type: 'file'
  },
  {
    name: 'Redux store',
    path: 'frontend/src/store/store.ts',
    type: 'file'
  },
  {
    name: 'Test configuration',
    path: 'frontend/jest.config.js',
    type: 'file'
  },
  {
    name: 'Backend test config',
    path: 'backend/jest.config.js',
    type: 'file'
  }
];

let passed = 0;
let failed = 0;

checks.forEach(check => {
  const fullPath = path.join(__dirname, check.path);
  let exists = false;
  
  if (check.type === 'file') {
    exists = fs.existsSync(fullPath) && fs.statSync(fullPath).isFile();
  } else if (check.type === 'directory') {
    exists = fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
  }
  
  if (exists) {
    console.log(`✅ ${check.name}`);
    passed++;
  } else {
    console.log(`❌ ${check.name} - Missing: ${check.path}`);
    failed++;
  }
});

console.log(`\n📊 Verification Results:`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

if (failed === 0) {
  console.log('\n🎉 Setup verification completed successfully!');
  console.log('\n🚀 Next steps:');
  console.log('1. Run `npm run dev:mock` to start with mock data');
  console.log('2. Or set up databases and run `npm run dev` for full functionality');
  console.log('3. Open http://localhost:5173 in your browser');
} else {
  console.log('\n⚠️  Some files are missing. Please check the setup instructions.');
  process.exit(1);
}