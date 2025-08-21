module.exports = {
    default: {
      // Set the global timeout for each step to 60 seconds (60000 milliseconds)
      timeout: 60 * 1000, // 60 seconds
      // Enable snippet generation for undefined steps (useful for quick step definition generation)
      snippets: true,
      // Set the format for the test reports (optional)
      format: ['progress', 'json:./reports/cucumber-report.json'],
      // Optionally, specify feature files and tags to run
      // features: ['./features/**/*.feature'],
      // tags: '@YourTag',
    },
  };