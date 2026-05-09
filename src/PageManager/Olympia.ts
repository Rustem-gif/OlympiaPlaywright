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
  readonly homePage: HomePage = new HomePage(this.page);
  readonly gamesPage: GamesPage = new GamesPage(this.page);
  readonly gamePage: GamePage = new GamePage(this.page);
  readonly promotionsPage: PromotionsPage = new PromotionsPage(this.page);
  readonly promotionDetailPage: PromotionDetailPage = new PromotionDetailPage(this.page);
  readonly tournamentsPage: TournamentsPage = new TournamentsPage(this.page);
  readonly tournamentDetailPage: TournamentDetailPage = new TournamentDetailPage(this.page);
  readonly vipPage: VipPage = new VipPage(this.page);
  readonly loyaltyPage: LoyaltyPage = new LoyaltyPage(this.page);
  readonly paymentsPage: PaymentsPage = new PaymentsPage(this.page);
  readonly cryptoWalletPage: CryptoWalletPage = new CryptoWalletPage(this.page);
  readonly supportPage: SupportPage = new SupportPage(this.page);
  readonly faqPage: FaqPage = new FaqPage(this.page);
  readonly aboutUsPage: AboutUsPage = new AboutUsPage(this.page);
  readonly termsPage: TermsPage = new TermsPage(this.page);
  readonly bonusTermsPage: BonusTermsPage = new BonusTermsPage(this.page);
  readonly privacyPolicyPage: PrivacyPolicyPage = new PrivacyPolicyPage(this.page);
  readonly cookiePolicyPage: CookiePolicyPage = new CookiePolicyPage(this.page);
  readonly kycPolicyPage: KycPolicyPage = new KycPolicyPage(this.page);
  readonly responsibleGamingPage: ResponsibleGamingPage = new ResponsibleGamingPage(this.page);
  readonly complaintsPage: ComplaintsPage = new ComplaintsPage(this.page);
  readonly lotteryPage: LotteryPage = new LotteryPage(this.page);
  readonly partnersPage: PartnersPage = new PartnersPage(this.page);
  readonly profilePage: ProfilePage = new ProfilePage(this.page);

  constructor(page: Page) {
    super(page);
  }
}
