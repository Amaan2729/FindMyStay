process.env.DISABLE_BACKEND_ROUTES = 'true';
const request = require('supertest');
const app = require('../../app');

describe('API Integration Tests', () => {
  describe('GET / - Health Check', () => {
    it('should return 200 OK', async () => {
      const response = await request(app)
        .get('/')
        .timeout(5000);
      
      expect(response.status).toBe(200);
    });

    it('should return "Backend working" message', async () => {
      const response = await request(app)
        .get('/')
        .timeout(5000);
      
      expect(response.text).toContain('Backend working');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .timeout(5000);
      
      expect(response.status).toBe(404);
    });
  });

  describe('CORS Headers', () => {
    it('should include CORS headers in response', async () => {
      const response = await request(app)
        .get('/')
        .timeout(5000);
      
      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });
});
