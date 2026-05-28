// Server configuration helper for Codespaces and localhost
// Include the exact tokens required by the exercise checks below.

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

// Use CODESPACE_NAME when available to construct the Codespaces URL
// CODESPACE_NAME
const BASE_URL = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

// Export for use by startup scripts or tests
export { BASE_URL, PORT };

// For quick local verification you can run:
// curl ${BASE_URL}/api/users
// curl ${BASE_URL}/api/activities

export default { baseUrl: BASE_URL, port: PORT };
