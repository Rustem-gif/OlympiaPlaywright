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
  au: {
    location: 'australia-brisbane',
    user: {
      dep0: {
        email: 'ol0depau@gt1.com',
        password: 'Olympia123!',
      },
      dep1: {
        email: 'ol1depau@gt1.com',
        password: 'Olympia123!',
      },
    },
  },
  ca: {
    location: 'canada-montreal',
    user: {
      dep0: {
        email: 'ol0depca@gt1.com',
        password: 'Olympia123!',
      },
      dep1: {
        email: 'ol1depca@gt1.com',
        password: 'Olympia123!',
      },
    },
  },
  de: {
    location: 'germany-frankfurt-1',
    user: {
      dep0: {
        email: 'ol0depde@gt1.com',
        password: 'Olympia123!',
      },
      dep1: {
        email: 'ol1depde@gt1.com',
        password: 'Olympia123!',
      },
    },
  },
  nz: {
    location: 'New Zealand',
    user: {
      dep0: {
        email: 'ol0depnz@gt1.com',
        password: 'Olympia123!',
      },
      dep1: {
        email: 'ol1depnz@gt1.com',
        password: 'Olympia123!',
      },
    },
  },
};
