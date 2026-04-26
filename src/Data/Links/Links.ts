export const BASE_URL = 'https://www.olympia.casino';

export const LOCALES = {
  AU: 'en-AU',
  CA: 'en-CA',
  NZ: 'en-NZ',
  DE: 'de',
  RU: 'ru',
  FI: 'fi',
  NO: 'no',
  FR: 'fr',
  PL: 'pl',
} as const;

export const LINKS = {
  Home: `${BASE_URL}/en-AU`,
  Games: `${BASE_URL}/en-AU/games`,
  GamesSlots: `${BASE_URL}/en-AU/games/slots`,
  GamesLive: `${BASE_URL}/en-AU/games/live`,
  GamesJackpot: `${BASE_URL}/en-AU/games/jackpot`,
  GamesNew: `${BASE_URL}/en-AU/games/new`,
  GamesPopular: `${BASE_URL}/en-AU/games/popular`,
  GamesTableGames: `${BASE_URL}/en-AU/games/table_games`,
  Promotions: `${BASE_URL}/en-AU/promotions`,
  Tournaments: `${BASE_URL}/en-AU/tournaments`,
  Vip: `${BASE_URL}/en-AU/vip`,
  Loyalty: `${BASE_URL}/en-AU/loyalty`,
  Payments: `${BASE_URL}/en-AU/payments`,
  CryptoWallet: `${BASE_URL}/en-AU/crypto-wallet`,
  Support: `${BASE_URL}/en-AU/support`,
  Faq: `${BASE_URL}/en-AU/faq`,
  AboutUs: `${BASE_URL}/en-AU/about-us`,
  Terms: `${BASE_URL}/en-AU/terms-and-conditions`,
  BonusTerms: `${BASE_URL}/en-AU/bonus-terms-and-conditions`,
  PrivacyPolicy: `${BASE_URL}/en-AU/privacy-policy`,
  CookiePolicy: `${BASE_URL}/en-AU/cookie-policy`,
  KycPolicy: `${BASE_URL}/en-AU/kyc-policy`,
  ResponsibleGaming: `${BASE_URL}/en-AU/responsible-gaming`,
  Complaints: `${BASE_URL}/en-AU/complaints`,
  Lottery: `${BASE_URL}/en-AU/lottery`,
  Partners: `${BASE_URL}/en-AU/partners`,
  Profile: `${BASE_URL}/en-AU/profile`,
} as const;

export const MODAL_PARAMS = {
  SignIn: '?sign-in=modal',
  SignUp: '?sign-up=modal',
  DepositBar: '?bar=modal',
  Search: '?search-modal=modal',
} as const;
