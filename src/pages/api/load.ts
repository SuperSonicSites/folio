import type { APIRoute } from 'astro';
import { loadBrief } from '../../lib/github';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const client = url.searchParams.get('client');

  if (!client) {
    return new Response(JSON.stringify({ error: 'Client name required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const content = await loadBrief(client);
    return new Response(JSON.stringify({ 
      content,
      lastEdited: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to load brief' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
