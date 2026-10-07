// Vercel Serverless Function - TikTok OAuth
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
  const { code, error, error_description } = req.query;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;
  const redirectUri = `${baseUrl}/api/auth/tiktok`;

  if (error) {
    console.error('TikTok error:', error, error_description);
    return res.redirect(`/login.html?error=${encodeURIComponent('TikTok login dibatalkan')}`);
  }

  // STEP 1: Redirect ke TikTok OAuth
  if (!code) {
    const params = new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY,
      scope: 'user.info.basic',
      response_type: 'code',
      redirect_uri: redirectUri,
      state: Math.random().toString(36).slice(2)
    });
    return res.redirect(`https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`);
  }

  // STEP 2: Tukar code jadi access token
  try {
    const tokenRes = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_key: process.env.TIKTOK_CLIENT_KEY,
        client_secret: process.env.TIKTOK_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri
      })
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error('TikTok token error:', tokenData);
      return res.redirect(`/login.html?error=${encodeURIComponent('Gagal ambil token TikTok')}`);
    }

    // STEP 3: Ambil info user (cuma user.info.basic)
    const userRes = await fetch(
      'https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name',
      { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
    );
    const userData = await userRes.json();
    const tiktokUser = userData.data?.user;

    if (!tiktokUser || !tiktokUser.open_id) {
      console.error('TikTok user error:', userData);
      return res.redirect(`/login.html?error=${encodeURIComponent('Gagal ambil data TikTok')}`);
    }

    // STEP 4: Bikin/update user di Firebase
    const uid = `tiktok_${tiktokUser.open_id}`;
    const db = admin.database();
    const userRef = db.ref(`users/${uid}`);
    const snap = await userRef.once('value');

    if (!snap.exists()) {
      await userRef.set({
        uid,
        provider: 'tiktok',
        tiktokId: tiktokUser.open_id,
        email: '',
        name: tiktokUser.display_name || 'TikTok User',
        nickname: '', // Kosong → bakal diisi lewat modal "Isi Nama"
        avatar: tiktokUser.avatar_url || '',
        saldo: 0,
        created: Date.now(),
        needsName: true
      });
      console.log('✅ New TikTok user created:', uid);
    } else {
      // Update avatar kalau ada perubahan
      await userRef.update({
        avatar: tiktokUser.avatar_url || snap.val().avatar || ''
      });
    }

    // STEP 5: Custom Token
    const customToken = await admin.auth().createCustomToken(uid, {
      provider: 'tiktok',
      tiktokId: tiktokUser.open_id
    });

    // STEP 6: Redirect balik ke login
    return res.redirect(`/login.html?custom_token=${customToken}&provider=tiktok`);

  } catch (e) {
    console.error('TikTok auth error:', e);
    return res.redirect(`/login.html?error=${encodeURIComponent('TikTok login gagal: ' + e.message)}`);
  }
}
