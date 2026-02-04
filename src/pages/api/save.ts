import type { APIRoute } from 'astro';
import { saveBrief } from '../../lib/github';

export const POST: APIRoute = async ({ request }) => {
  const { client, content } = await request.json();

  if (!client || !content) {
    return new Response(JSON.stringify({ error: 'Client and content required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    await saveBrief(client, content);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Save error:', error);
    return new Response(JSON.stringify({ error: 'Failed to save brief' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
