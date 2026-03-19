import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Auth Middleware & Profile Access', () => {
  
  it('should return 401 if no Authorization header is provided', async () => {
    const response = await request(app).get('/api/v1/user/profile');
    
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    // Sesuaikan dengan pesan error di authMiddleware kamu, misal: "Access Denied"
  });

  it('should return 403 for an invalid or expired token', async () => {
    const response = await request(app)
      .get('/api/v1/user/profile')
      .set('Authorization', 'Bearer token_palsu_disini');

    expect(response.status).toBe(403);
  });

});