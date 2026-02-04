import type { APIRoute } from 'astro';
import { listClients } from '../../lib/github';

export const GET: APIRoute = async ({ request }) => {
  try {
    const clients = await listClients();
    return new Response(JSON.stringify({ clients }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to load clients' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
