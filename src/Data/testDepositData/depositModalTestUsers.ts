type UserCredentials = {
  email: string;
  password: string;
};

type UserTypes = {
  [type: string]: UserCredentials;
};

type DepositModalUsers = {
  [locale: string]: {
    location: string;
    user: UserTypes;
  };
};

// Add new locales by extending this object.
// Each locale needs a VPN location string (ExpressVPN location name)
// and one or more user types (untrusted, trusted, affiliates, etc.)
export const USERS_DEPOSIT_MODAL: DepositModalUsers = {
  ie: {
    location: 'Ireland',
    user: {
      regular: {
        email: 'regular@gt1.com',
        password: 'Olympia123!',
      },
      demigod: {
        email: 'demigod@gt1.com',
        password: 'Olympia123!',
      },
      divine: {
        email: 'divine@gt1.com',
        password: 'Olympia123!',
      },
      titan: {
        email: 'titan@gt1.com',
        password: 'Olympia123!',
      },
    },
  },
};
