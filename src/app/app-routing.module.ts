import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { AuthorProfileComponent } from './components/pages/author-profile/author-profile.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { BlogGridComponent } from './components/pages/blog-grid/blog-grid.component';
import { BlogRightSidebarComponent } from './components/pages/blog-right-sidebar/blog-right-sidebar.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CategoriesComponent } from './components/pages/categories/categories.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { DashboardAddListingsComponent } from './components/pages/dashboard/dashboard-add-listings/dashboard-add-listings.component';
import { DashboardBookingsComponent } from './components/pages/dashboard/dashboard-bookings/dashboard-bookings.component';
import { DashboardBookmarksComponent } from './components/pages/dashboard/dashboard-bookmarks/dashboard-bookmarks.component';
import { DashboardInvoiceComponent } from './components/pages/dashboard/dashboard-invoice/dashboard-invoice.component';
import { DashboardMessagesComponent } from './components/pages/dashboard/dashboard-messages/dashboard-messages.component';
import { DashboardMyListingsComponent } from './components/pages/dashboard/dashboard-my-listings/dashboard-my-listings.component';
import { DashboardMyProfileComponent } from './components/pages/dashboard/dashboard-my-profile/dashboard-my-profile.component';
import { DashboardReviewsComponent } from './components/pages/dashboard/dashboard-reviews/dashboard-reviews.component';
import { DashboardWalletComponent } from './components/pages/dashboard/dashboard-wallet/dashboard-wallet.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { EventsDetailsComponent } from './components/pages/events-details/events-details.component';
import { EventsComponent } from './components/pages/events/events.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { GridListingsFullWidthComponent } from './components/pages/grid-listings-full-width/grid-listings-full-width.component';
import { GridListingsLeftSidebarComponent } from './components/pages/grid-listings-left-sidebar/grid-listings-left-sidebar.component';
import { GridListingsRightSidebarComponent } from './components/pages/grid-listings-right-sidebar/grid-listings-right-sidebar.component';
import { HomeDemoOneComponent } from './components/pages/home-demo-one/home-demo-one.component';
import { HomeDemoTwoComponent } from './components/pages/home-demo-two/home-demo-two.component';
import { HowItWorksPageComponent } from './components/pages/how-it-works-page/how-it-works-page.component';
import { ListingsDetailsComponent } from './components/pages/listings-details/listings-details.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { ProductsDetailsComponent } from './components/pages/products-details/products-details.component';
import { ProductsListComponent } from './components/pages/products-list/products-list.component';
import { TopPlaceComponent } from './components/pages/top-place/top-place.component';
import { VerticalListingsFullWidthComponent } from './components/pages/vertical-listings-full-width/vertical-listings-full-width.component';
import { VerticalListingsLeftSidebarComponent } from './components/pages/vertical-listings-left-sidebar/vertical-listings-left-sidebar.component';
import { VerticalListingsRightSidebarComponent } from './components/pages/vertical-listings-right-sidebar/vertical-listings-right-sidebar.component';
import { DashboardEditListingsComponent } from './components/pages/dashboard/dashboard-edit-listings/dashboard-edit-listings.component';
import { DashboardAddBlogComponent } from './components/pages/dashboard/dashboard-add-blog/dashboard-add-blog.component';
import { DashboardUserDetailsComponent } from './components/pages/dashboard/dashboard-user-details/dashboard-user-details.component';
import { DashboardAllListingsComponent } from './components/pages/dashboard/dashboard-all-listings/dashboard-all-listings.component';
// import { AuthGuard } from '../../../Xploradoor/src/app/services/AuthService/auth.guard';
import { ReelsStatusComponent } from './components/pages/reels-status/reels-status.component';
import { ReelsVertical } from './components/pages/reels-listings/reels-listings.component';
import { ShowStoriesComponent } from './components/pages/show-stories/show-stories.component';
import { ShowUsersComponent } from './components/pages/show-users/show-users.component';
import { DashboardAddAnnouncementComponent } from './components/pages/dashboard/dashboard-add-announcement/dashboard-add-announcement.component';
import { HomeoneBannerWishlistComponent } from './components/pages/home-demo-one/homeone-banner-wishlist/homeone-banner-wishlist.component';


const routes: Routes = [
    {path: '', component: HomeDemoOneComponent},
    {path: 'index-2', component: HomeDemoTwoComponent},
    {path: 'about', component: AboutUsComponent},
    {path: 'how-it-works', component: HowItWorksPageComponent},
    {path: 'pricing', component: PricingComponent},
    {path: 'gallery', component: GalleryComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'coming-soon', component: ComingSoonComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'blog-grid', component: BlogGridComponent},
    {path: 'blog-right-sidebar', component: BlogRightSidebarComponent},
    {path: 'blog-details', component: BlogDetailsComponent},
    {path: 'products-list', component: ProductsListComponent},
    {path: 'cart', component: CartComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'single-products', component: ProductsDetailsComponent},
    {path: 'user-profile', component: AuthorProfileComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'destinations', component: TopPlaceComponent},
    {path: 'vertical-listings-left-sidebar', component: VerticalListingsLeftSidebarComponent},
    {path: 'vertical-listings-right-sidebar', component: VerticalListingsRightSidebarComponent},
    {path: 'reels-vertical', component: ReelsVertical},
    {path: 'vertical-listings-full-width', component: VerticalListingsFullWidthComponent},
    {path: 'grid-listings-left-sidebar', component: GridListingsLeftSidebarComponent},
    {path: 'homeone-banner-wishlist', component: HomeoneBannerWishlistComponent},
    {path: 'grid-listings-right-sidebar', component: GridListingsRightSidebarComponent},
    {path: 'grid-listings-full-width', component: GridListingsFullWidthComponent},
    {path: 'single-listings', component: ListingsDetailsComponent},
    {path: 'events', component: EventsComponent},
    {path: 'single-events', component: EventsDetailsComponent},
    {path: 'stories', component: ReelsStatusComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'dashboard-messages', component: DashboardMessagesComponent},
    {path: 'dashboard-bookings', component: DashboardBookingsComponent},
    {path: 'dashboard-wallet', component: DashboardWalletComponent},
    {path: 'dashboard-add-blog', component: DashboardAddBlogComponent},
    {path: 'dashboard-add-announcement', component: DashboardAddAnnouncementComponent},
    {path: 'dashboard-reviews', component: DashboardReviewsComponent},
    {path: 'dashboard-invoice', component: DashboardInvoiceComponent},
    {path: 'dashboard-my-profile', component: DashboardMyProfileComponent},
    {path: 'dashboard-add-listings', component: DashboardAddListingsComponent},
    {path: 'dashboard-edit-listings', component: DashboardEditListingsComponent},
    {path: 'dashboard-bookmarks', component: DashboardBookmarksComponent},
    {path: 'dashboard-my-listings', component: DashboardMyListingsComponent},
    {path: 'dashboard-user-details', component: DashboardUserDetailsComponent},
    {path: 'dashboard-all-listings', component: DashboardAllListingsComponent},
    {path: 'show-stories', component: ShowStoriesComponent},
    {path: 'show-users', component: ShowUsersComponent},
    // Here add new pages component

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule { }