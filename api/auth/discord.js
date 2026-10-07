// Vercel Serverless Function - Discord OAuth
import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const raw = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf-8');
    const serviceAccount = JSON.parse(raw);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DB_URL
    });
    console.log('✅ Firebase Admin initialized');
  } catch (e) {
    console.error('❌ Firebase Admin init error:', e.message);
  }
}

export default async function handler(req, res) {
  const { code, error } = req.query;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;
  const redirectUri = `${baseUrl}/api/auth/discord`;

  if (error) {
    console.error('Discord error:', error);
    return res.redirect(`/login.html?error=${encodeURIComponent('Discord login dibatalkan')}`);
  }

  // STEP 1: Redirect ke Discord OAuth
  if (!code) {
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'identify email'
    });
    return res.redirect(`https://discord.com/oauth2/authorize?${params.toString()}`);
  }

  // STEP 2: Tukar code jadi access token
  try {
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri
      })
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error('Discord token error:', tokenData);
      return res.redirect(`/login.html?error=${encodeURIComponent('Gagal ambil token Discord')}`);
    }

    // STEP 3: Ambil user info Discord
    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const discordUser = await userRes.json();

    if (!discordUser.id) {
      return res.redirect(`/login.html?error=${encodeURIComponent('Gagal ambil data Discord')}`);
    }

    // STEP 4: Bikin/update user di Firebase
    const uid = `discord_${discordUser.id}`;
    const db = admin.database();
    const userRef = db.ref(`users/${uid}`);
    const snap = await userRef.once('value');

    if (!snap.exists()) {
      await userRef.set({
        uid,
        provider: 'discord',
        discordId: discordUser.id,
        email: discordUser.email || '',
        name: discordUser.global_name || discordUser.username,
        nickname: '', // Kosong → isi lewat modal
        avatar: discordUser.avatar
          ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`
          : '',
        saldo: 0,
        created: Date.now(),
        needsName: true
      });
      console.log('✅ New Discord user created:', uid);
    } else {
      await userRef.update({
        avatar: discordUser.avatar
          ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`
          : '',
        email: discordUser.email || snap.val().email || ''
      });
    }

    // STEP 5: Custom Token
    const customToken = await admin.auth().createCustomToken(uid, {
      provider: 'discord',
      discordId: discordUser.id
    });

    // STEP 6: Redirect balik
    return res.redirect(`/login.html?custom_token=${customToken}&provider=discord`);

  } catch (e) {
    console.error('Discord auth error:', e);
    return res.redirect(`/login.html?error=${encodeURIComponent('Discord login gagal: ' + e.message)}`);
  }
}
