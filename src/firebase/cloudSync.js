// Optional cloud backup: mirrors the app's localStorage data to Firestore (users/{uid}/data/state).
// Active ONLY when Firebase keys are set and the farmer is logged in. Otherwise the app stays local.
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const SYNC_KEYS = [
  'krishimitra_farmer_profile', 'krishimitra_crop_plan', 'krishimitra_expenses',
  'krishimitra_activities', 'krishimitra_disease_history', 'krishimitra_irrigations',
  'krishimitra_sowing_details', 'krishimitra_consult_requests',
];

let currentUid = null;
let timer = null;
let patched = false;

const collect = () => {
  const out = {};
  SYNC_KEYS.forEach((k) => { const v = localStorage.getItem(k); if (v !== null) out[k] = v; });
  return out;
};

const push = async () => {
  if (!db || !currentUid) return;
  try {
    await setDoc(doc(db, 'users', currentUid, 'data', 'state'), { keys: collect(), updatedAt: new Date().toISOString() });
  } catch (e) { console.warn('Cloud sync failed (data is still saved on this device)', e); }
};

const schedule = () => { clearTimeout(timer); timer = setTimeout(push, 1500); };

// Call once after login, before pages render. Loads cloud data into localStorage.
export const startCloudSync = async (uid) => {
  if (!db) return;
  currentUid = uid;
  try {
    const snap = await getDoc(doc(db, 'users', uid, 'data', 'state'));
    if (snap.exists()) {
      const keys = snap.data().keys || {};
      Object.entries(keys).forEach(([k, v]) => { if (SYNC_KEYS.includes(k)) localStorage.setItem(k, v); });
    } else {
      await push(); // first login: upload what is on this device
    }
  } catch (e) { console.warn('Cloud load failed, using local data', e); }

  if (!patched) {
    patched = true;
    const orig = Storage.prototype.setItem;
    Storage.prototype.setItem = function (k, v) {
      orig.call(this, k, v);
      if (this === window.localStorage && SYNC_KEYS.includes(k)) schedule();
    };
  }
};

export const stopCloudSync = () => { currentUid = null; clearTimeout(timer); };
