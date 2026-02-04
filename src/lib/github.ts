const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'SuperSonicSites/folio';
const GITHUB_API = 'https://api.github.com';

interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
}

export async function listClients(): Promise<string[]> {
  if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN not set');

  const [owner, repo] = GITHUB_REPO.split('/');
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/clients`;

  try {
    const res = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!res.ok) {
      if (res.status === 404) return []; // No clients folder yet
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const files = await res.json() as GitHubFile[];
    return files
      .filter(f => f.type === 'file' && f.name.endsWith('.md'))
      .map(f => f.name.replace('.md', ''));
  } catch (error) {
    console.error('Error listing clients:', error);
    return [];
  }
}

export async function loadBrief(clientName: string): Promise<string> {
  if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN not set');

  const [owner, repo] = GITHUB_REPO.split('/');
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/clients/${clientName}.md`;

  try {
    const res = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3.raw'
      }
    });

    if (!res.ok) {
      if (res.status === 404) return ''; // New client
      throw new Error(`GitHub API error: ${res.status}`);
    }

    return await res.text();
  } catch (error) {
    console.error('Error loading brief:', error);
    return '';
  }
}

export async function saveBrief(clientName: string, content: string): Promise<void> {
  if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN not set');

  const [owner, repo] = GITHUB_REPO.split('/');
  const path = `clients/${clientName}.md`;
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`;

  // Get current SHA if file exists
  let sha: string | undefined;
  try {
    const res = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (res.ok) {
      const data = await res.json() as any;
      sha = data.sha;
    }
  } catch (error) {
    // File doesn't exist yet, that's fine
  }

  const encoded = Buffer.from(content).toString('base64');

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: `Update brief for ${clientName}`,
      content: encoded,
      ...(sha && { sha })
    })
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }
}
