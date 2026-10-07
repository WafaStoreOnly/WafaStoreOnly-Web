// Vercel Serverless Function - Proxy untuk Roblox API
export default async function handler(req, res) {
  // CORS headers biar bisa diakses dari web lo
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username } = req.body || {};
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username wajib diisi' });
  }

  // Validasi format username Roblox
  const clean = username.trim();
  if (clean.length < 3 || clean.length > 20) {
    return res.status(400).json({ exists: false, error: 'Username harus 3-20 karakter' });
  }
  if (!/^[a-zA-Z0-9_]+$/.test(clean)) {
    return res.status(400).json({ exists: false, error: 'Username cuma boleh huruf, angka, dan underscore' });
  }

  try {
    // Panggil API resmi Roblox untuk cek username
    const robloxRes = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'WafaStoreOnly/1.0'
      },
      body: JSON.stringify({
        usernames: [clean],
        excludeBannedUsers: true
      })
    });

    if (!robloxRes.ok) {
      return res.status(200).json({ exists: false, error: 'Gagal cek username, coba lagi' });
    }

    const data = await robloxRes.json();

    // Kalau data kosong = username tidak ditemukan
    if (!data.data || data.data.length === 0) {
      return res.status(200).json({
        exists: false,
        error: 'Username Roblox tidak ditemukan. mohon dicek kembali!'
      });
    }

    // Username ditemukan
    const user = data.data[0];
    return res.status(200).json({
      exists: true,
      id: user.id,
      username: user.name,
      displayName: user.displayName
    });

  } catch (e) {
    console.error('Roblox API error:', e);
    return res.status(200).json({ exists: false, error: 'Server error, coba lagi nanti' });
  }
}
