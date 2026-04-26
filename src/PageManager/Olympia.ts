import { Page } from '@playwright/test';
import BasePage from '../PO/BasePage/BasePage';
import HomePage from '../PO/HomePage/HomePage';
import GamesPage from '../PO/GamesPage/GamesPage';
import GamePage from '../PO/GamePage/GamePage';
import PromotionsPage from '../PO/PromotionsPage/PromotionsPage';
import PromotionDetailPage from '../PO/PromotionDetailPage/PromotionDetailPage';
import TournamentsPage from '../PO/TournamentsPage/TournamentsPage';
import TournamentDetailPage from '../PO/TournamentDetailPage/TournamentDetailPage';
import VipPage from '../PO/VipPage/VipPage';
import LoyaltyPage from '../PO/LoyaltyPage/LoyaltyPage';
import PaymentsPage from '../PO/PaymentsPage/PaymentsPage';
import CryptoWalletPage from '../PO/CryptoWalletPage/CryptoWalletPage';
import SupportPage from '../PO/SupportPage/SupportPage';
import FaqPage from '../PO/FaqPage/FaqPage';
import AboutUsPage from '../PO/AboutUsPage/AboutUsPage';
import TermsPage from '../PO/TermsPage/TermsPage';
import BonusTermsPage from '../PO/BonusTermsPage/BonusTermsPage';
import PrivacyPolicyPage from '../PO/PrivacyPolicyPage/PrivacyPolicyPage';
import CookiePolicyPage from '../PO/CookiePolicyPage/CookiePolicyPage';
import KycPolicyPage from '../PO/KycPolicyPage/KycPolicyPage';
import ResponsibleGamingPage from '../PO/ResponsibleGamingPage/ResponsibleGamingPage';
import ComplaintsPage from '../PO/ComplaintsPage/ComplaintsPage';
import LotteryPage from '../PO/LotteryPage/LotteryPage';
import PartnersPage from '../PO/PartnersPage/PartnersPage';
import ProfilePage from '../PO/ProfilePage/ProfilePage';

export default class Olympia extends BasePage {
  private _homePage?: HomePage;
  private _gamesPage?: GamesPage;
  private _gamePage?: GamePage;
  private _promotionsPage?: PromotionsPage;
  private _promotionDetailPage?: PromotionDetailPage;
  private _tournamentsPage?: TournamentsPage;
  private _tournamentDetailPage?: TournamentDetailPage;
  private _vipPage?: VipPage;
  private _loyaltyPage?: LoyaltyPage;
  private _paymentsPage?: PaymentsPage;
  private _cryptoWalletPage?: CryptoWalletPage;
  private _supportPage?: SupportPage;
  private _faqPage?: FaqPage;
  private _aboutUsPage?: AboutUsPage;
  private _termsPage?: TermsPage;
  private _bonusTermsPage?: BonusTermsPage;
  private _privacyPolicyPage?: PrivacyPolicyPage;
  private _cookiePolicyPage?: CookiePolicyPage;
  private _kycPolicyPage?: KycPolicyPage;
  private _responsibleGamingPage?: ResponsibleGamingPage;
  private _complaintsPage?: ComplaintsPage;
  private _lotteryPage?: LotteryPage;
  private _partnersPage?: PartnersPage;
  private _profilePage?: ProfilePage;

  constructor(page: Page) {
    super(page);
  }

  get homePage(): HomePage {
    return (this._homePage ??= new HomePage(this.page));
  }

  get gamesPage(): GamesPage {
    return (this._gamesPage ??= new GamesPage(this.page));
  }

  get gamePage(): GamePage {
    return (this._gamePage ??= new GamePage(this.page));
  }

  get promotionsPage(): PromotionsPage {
    return (this._promotionsPage ??= new PromotionsPage(this.page));
  }

  get promotionDetailPage(): PromotionDetailPage {
    return (this._promotionDetailPage ??= new PromotionDetailPage(this.page));
  }

  get tournamentsPage(): TournamentsPage {
    return (this._tournamentsPage ??= new TournamentsPage(this.page));
  }

  get tournamentDetailPage(): TournamentDetailPage {
    return (this._tournamentDetailPage ??= new TournamentDetailPage(this.page));
  }

  get vipPage(): VipPage {
    return (this._vipPage ??= new VipPage(this.page));
  }

  get loyaltyPage(): LoyaltyPage {
    return (this._loyaltyPage ??= new LoyaltyPage(this.page));
  }

  get paymentsPage(): PaymentsPage {
    return (this._paymentsPage ??= new PaymentsPage(this.page));
  }

  get cryptoWalletPage(): CryptoWalletPage {
    return (this._cryptoWalletPage ??= new CryptoWalletPage(this.page));
  }

  get supportPage(): SupportPage {
    return (this._supportPage ??= new SupportPage(this.page));
  }

  get faqPage(): FaqPage {
    return (this._faqPage ??= new FaqPage(this.page));
  }

  get aboutUsPage(): AboutUsPage {
    return (this._aboutUsPage ??= new AboutUsPage(this.page));
  }

  get termsPage(): TermsPage {
    return (this._termsPage ??= new TermsPage(this.page));
  }

  get bonusTermsPage(): BonusTermsPage {
    return (this._bonusTermsPage ??= new BonusTermsPage(this.page));
  }

  get privacyPolicyPage(): PrivacyPolicyPage {
    return (this._privacyPolicyPage ??= new PrivacyPolicyPage(this.page));
  }

  get cookiePolicyPage(): CookiePolicyPage {
    return (this._cookiePolicyPage ??= new CookiePolicyPage(this.page));
  }

  get kycPolicyPage(): KycPolicyPage {
    return (this._kycPolicyPage ??= new KycPolicyPage(this.page));
  }

  get responsibleGamingPage(): ResponsibleGamingPage {
    return (this._responsibleGamingPage ??= new ResponsibleGamingPage(this.page));
  }

  get complaintsPage(): ComplaintsPage {
    return (this._complaintsPage ??= new ComplaintsPage(this.page));
  }

  get lotteryPage(): LotteryPage {
    return (this._lotteryPage ??= new LotteryPage(this.page));
  }

  get partnersPage(): PartnersPage {
    return (this._partnersPage ??= new PartnersPage(this.page));
  }

  get profilePage(): ProfilePage {
    return (this._profilePage ??= new ProfilePage(this.page));
  }
}
