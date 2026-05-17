import { expect, test } from '@playwright/test';
import { getVpnController, IVpnController } from '../../helpers/vpnControllerFactory';
import Olympia from '../../src/PageManager/Olympia';
import { USERS_DEPOSIT_MODAL } from '../../src/Data/testDepositData/depositModalTestUsers';

for (const locale of Object.keys(USERS_DEPOSIT_MODAL)) {
  const { location, user } = USERS_DEPOSIT_MODAL[locale];

  for (const [type, creds] of Object.entries(user)) {
    const { email, password } = creds;

    test.describe(`Check ${locale}, ${type}`, () => {
      let olympia: Olympia;
      let vpnController: IVpnController;

      test.beforeAll(async () => {
        vpnController = getVpnController();
        const vpnStatus = await vpnController.vpnCheckStatus();

        if (/^connected/i.test(vpnStatus)) {
          await vpnController.vpnDisconnect();
        }
      });

      test.beforeEach(async ({ page }) => {
        olympia = new Olympia(page);
        await vpnController.vpnConnect(location);
        await vpnController.sleepVPN(10000);
      });

      test.afterEach(async () => {
        await vpnController.vpnDisconnect();
        await vpnController.sleepVPN(1000);
      });

      test(`Visual comparison of dep modal ${locale} - ${type}`, async () => {
        await olympia.navTo('/');
        const signInModal =await olympia.header.openSignInModal();
        await signInModal.signIn(email, password);
        const depositModal = await olympia.header.clickDepositButton();
        await depositModal.depMethodsList.waitFor({ state: 'visible', timeout: 15000 });
        await olympia.getPage.waitForTimeout(8000);

        await expect(depositModal.depMethodsList).toHaveScreenshot({
          maxDiffPixels: 500,
          maxDiffPixelRatio: 0.1,
          threshold: 0.2,
        });
      });
    });
  }
}
