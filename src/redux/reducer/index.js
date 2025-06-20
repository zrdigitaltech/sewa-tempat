import { combineReducers } from 'redux';

// Import reducers yang diperlukan
import { kontrakanReducer } from '@/redux/reducer/kontrakan/reducer';
import { tipePropertiReducer } from '@/redux/reducer/tipeProperti/reducer';
import { tipeSewaReducer } from '@/redux/reducer/tipeSewa/reducer';
import { tipeKostReducer } from '@/redux/reducer/tipeKost/reducer';
import { tipeKamarReducer } from '@/redux/reducer/tipeKamar/reducer';

import { panduanReducer } from '@/redux/reducer/panduan/reducer';
import { authorReducer } from '@/redux/reducer/author/reducer';

import { hubungiPengiklanPropertiReducer } from '@/redux/reducer/hubungiPengiklanProperti/reducer';
import { laporkanIklanReducer } from '@/redux/reducer/laporkanIklan/reducer';
import { beriSaranReducer } from '@/redux/reducer/beriSaran/reducer';
import { konsultasiReducer } from '@/redux/reducer/konsultasi/reducer';
import { authReducer } from '@/redux/reducer/auth/reducer';
import { ulasanPenggunaReducer } from '@/redux/reducer/ulasanPengguna/reducer';
import { investorReducer } from '@/redux/reducer/investor/reducer';

// Combine semua reducers menjadi satu
const rootReducer = combineReducers({
  kontrakan: kontrakanReducer,
  tipeProperti: tipePropertiReducer,
  tipeSewa: tipeSewaReducer,
  tipeKost: tipeKostReducer,
  tipeKamar: tipeKamarReducer,

  panduan: panduanReducer,
  author: authorReducer,

  hubungiPengiklanProperti: hubungiPengiklanPropertiReducer,
  laporkanIklan: laporkanIklanReducer,
  beriSaran: beriSaranReducer,
  konsultasi: konsultasiReducer,
  auth: authReducer,
  ulasanPengguna: ulasanPenggunaReducer,
  investor: investorReducer
});

export default rootReducer;
