export class BusinessDetail {
    BUSINESS_DETAIL_ID: number;
    PASSWORD: string;
    VERIFY_PASSWORD: string;
    STATE: string;
    ZIP_CODE: string;
    EMAIL_ADDRESS: string;
    BUSINESS_NAME: string;
    BUSINESS_ADDRESS: string;
    BUSINESS_ADDRESS_LINK: string;
    BUSINESS_CITY: string;
    BUSINESS_ZIP_CODE: string;
    BUSINESS_HOURS: string;
    BUSINESS_CATEGORY: string;
    BUSINESS_CATEGORY_TYPE: string;
    BUSINESS_PICTURE_ID: string;
    BUSINESS_IMPORTANT_NOTES: string;
    CREATED_BY: string = 'TEAM XPLORE';
    CREATED_DATE: Date;
    MODIFIED_BY: string = 'TEAM XPLORE';
    MODIFIED_DATE: Date;
    DELETED: boolean = false;
    uploadedFilesName: string[] = [];
    BusinessFilesDetail: BusinessFilesDetail[];
    MONDAY_OPENING_TIME: string = '9 AM';
    MONDAY_CLOSING_TIME: string = '9 PM';
    TUESDAY_OPENING_TIME: string = '9 AM';
    TUESDAY_CLOSING_TIME: string = '9 PM';
    WEDNESDAY_OPENING_TIME: string = '9 AM';
    WEDNESDAY_CLOSING_TIME: string = '9 PM';
    THURSDAY_OPENING_TIME: string = '9 AM';
    THURSDAY_CLOSING_TIME: string = '9 PM';
    FRIDAY_OPENING_TIME: string = '9 AM';
    FRIDAY_CLOSING_TIME: string = '9 PM';
    SATURDAY_OPENING_TIME: string = '9 AM';
    SATURDAY_CLOSING_TIME: string = '9 PM';
    SUNDAY_OPENING_TIME: string = '9 AM';
    SUNDAY_CLOSING_TIME: string = '9 PM';
    CONTACT_NO: string;
    OpenClose: string;
    CurrentDayOpeningTime: string;
    CurrentDayClosingTime: string;
    FACEBOOK_LINK: string;
    INSTAGRAM_LINK: string;
    TWITTER_LINK: string;
    TIKTOK_LINK: string;
    LINKEDIN_LINK: string;
    YOUTUBE_LINK: string;
    USER_ID: number;
}

export class  BusinessFilesDetailList {
    BUSINESS_FILES_DTEAIL_ID: number;
}

export class  BusinessCategoryList {
    BUSINESS_CATEGORY: string;
    CategoryCount: number;
}
export class  images {
    url: string;
    type: string;
    //CategoryCount: number;
}


export class BusinessFilesDetail {
    BUSINESS_FILES_DTEAIL_ID: number;
    BUSINESS_DETAIL_ID: number;
    FILE_PATH: string;
    FILE_PATH_1: string;
    CREATED_BY: string = 'TEAM XPLORE';
    CREATED_DATE: Date;
    MODIFIED_BY: string = 'TEAM XPLORE';
    MODIFIED_DATE: Date;
    DELETED: boolean = false;
}

export class BusinessBlogDetail {
    BUSINESS_BLOG_ID: number;
    BLOG_TITLE: string;
    AUTHOR_NAME: string;
    EMAIL_ADDRESS: string;
    BUSINESS_BLOG_CITY: string;
    BUSINESS_BLOG_ADDRESS: string;
    BUSINESS_BLOG_CATEGORY: string;
    BUSINESS_IMPORTANT_NOTES: string;
    CREATED_BY: string = 'TEAM XPLORE';
    CREATED_DATE: Date;
    MODIFIED_BY: string = 'TEAM XPLORE';
    MODIFIED_DATE: Date;
    DELETED: boolean = false;
    uploadedFilesName: string[] = [];
    BusinessFilesDetail: BusinessFilesDetail[];
}

export class SurveyLink {
    ENCRYPTED_PATIENT_ACCOUNT: string;
    SURVEY_METHOD: string;
    OPEN_SURVEY_METHOD: string;
}

export class NavigationAndToggle  {
    isShowQ1: boolean = true;
    isShowQ2: boolean = false;
    isShowQ3: boolean = false;
    isShowFeedback: boolean = false;
    isShowThanksToSurvay: boolean = false;
    q1YesToggle: boolean = false;
    q1NoToggle: boolean = false;
    q2YesToggle: boolean = false;
    q2NoToggle: boolean = false;
    q3YesToggle: boolean = false;
    q3NoToggle: boolean = false;
}


export class UserAccount {
    APPLICATION_USER_ACCOUNTS_ID: number;
    User_Name: string;
    EMAIL_ADDRESS: string;
    NEW_PASSWORD: string;
    PASSWORD: string;
    CONFIRM_PASSWORD: string;
    UserNameEmail: string;
    LoginPassword: string;
    Blocked: boolean;
    ACCOUNT_TYPE: string;
    IS_FOLLOWING: boolean;
    ReelsCount: number;
    FollowingCount: number;
    FollowersCount: number;
    UserReelsDetails: ReelsDetails[] = [];
    UserSavedReelsDetails: ReelsDetails[] = [];
    REEL_STATUS: boolean;
    NAME: string;
    PHONE_NUMBER: string;
    ADDRESS: string;
    USER_BIO: string;
    ZIP_CODE: string;
    FACEBOOK_LINK: string;
    INSTAGRAM_LINK: string;
    TWITTER_LINK: string;
    TIKTOK_LINK: string;
    LINKEDIN_LINK: string;
    YOUTUBE_LINK: string;

}


export class WeeklyTimeSlots {
    MONDAY_OPENING_TIME: string = '9 AM';
    MONDAY_CLOSING_TIME: string = '9 PM';
    TUESDAY_OPENING_TIME: string = '9 AM';
    TUESDAY_CLOSING_TIME: string = '9 PM';
    WEDNESDAY_OPENING_TIME: string = '9 AM';
    WEDNESDAY_CLOSING_TIME: string = '9 PM';
    THURSDAY_OPENING_TIME: string = '9 AM';
    THURSDAY_CLOSING_TIME: string = '9 PM';
    FRIDAY_OPENING_TIME: string = '9 AM';
    FRIDAY_CLOSING_TIME: string = '9 PM';
    SATURDAY_OPENING_TIME: string = '9 AM';
    SATURDAY_CLOSING_TIME: string = '9 PM';
    SUNDAY_OPENING_TIME: string = '9 AM';
    SUNDAY_CLOSING_TIME: string = '9 PM';
}


export class UserAccountDetails {
    User_Name: string;
    EMAIL_ADDRESS: string;
    PASSWORD: string;
    CONFIRM_PASSWORD: string;
    UserNameEmail: string;
    LoginPassword: string;
}

export class BusinessFilters {
    isCheckRestaurant: boolean;
    isCheckHomeServices: boolean;
    isCheckAgency: boolean;
    isCheckHotel: boolean;
    isCheckBeautySpa: boolean;
    isCheckFitness: boolean;
    isCheckShopping: boolean;
    isCheckHospital: boolean;
    isCheckEvents: boolean;
    isCheckClothing: boolean;
    isLocation: string = "";
    isCategory: string = "";
}
export class  BusinessDetailCountList {
    //id: number;
    //name: string;
    category: string;
    count: number;
    ids: number[];
  }

  export class BusinessRating{
    TBL_BUSINESS_RATING_ID: number;
    BUSINESS_ID: number;
    CLEANLINESS_RATING: string = "0";
    ACCURACY_RATING: string = "0";
    LOCATION_RATING: string = "0";
    CHECKIN_RATING: string = "0";
    COMMUNICATION_RATING: string = "0";
    VALUE_RATING: string;
    EMAIL_ADDRESS: string;
    NAME: string;
    FEEDBACK: string;
    SAVE_INFORMATION_OR_NOT: boolean;
    CREATED_BY: string = 'TEAM XPLORE';
    CREATED_DATE: Date;
    MODIFIED_BY: string = 'TEAM XPLORE';
    MODIFIED_DATE: Date;
    DELETED: boolean = false;
    AVG_RATING: string;
}
export class ReelsDetails {
    REELS_DETAILS_ID: number;
    USER_ID?: number;
    EMAIL_ADDRESS?: string;
    USER_TYPE?: string;
    COMMENT_ID?: string;
    STATUS_SEEN_DETAIL?: string;
    CREATED_BY: string = 'TEAM XPLORE';
    CREATED_DATE?: Date;
    MODIFIED_BY: string = 'TEAM XPLORE';
    MODIFIED_DATE?: Date;
    DELETED: boolean = false;
    uploadedFilesName: string[] = [];
    BusinessFilesDetail: BusinessFilesDetail[];
    authorName?: string;
  authorImg?: string;
  isMuted: boolean = false;
  description?: string;
  musicName?: string;
  liked: boolean = false;
  isBookmarked: boolean = false;
  likesCount?: number;
  reelsCommentsDetailsList: string[] = [];
  //reelsCommentsModelList: ReelsCommentsDetails[];
  reelsCommentsModelList: ReelsCommentsDetails[] = [];
  REEL_LIKES_COUNT: number;
  IS_REEL_LIKED: boolean;
  isClickOnReelLike: boolean;
  is_REEL_Liked: boolean;
  IS_REEL_LIKED_OR_NOT: boolean;
  isLikeUnlikeReel: boolean;
  IS_REEL_SAVED_OR_NOT: boolean;
  isPlaying: boolean = false;
  REEL_STATUS: boolean;
  picture: string = 'https://randomuser.me/api/portraits/men/61.jpg';
  username: string = 'salman';
  images: images[];
}

export class ReelsCommentsDetails {
    REELS_COMMENTS_DETAILS_ID: number;
    REELS_DETAILS_ID: number;
    USER_ID?: number;
    COMMENT: string;
    COMMENT_LIKE: number;
    COMMENT_REPLAY: string;
    CREATED_BY: string = 'TEAM XPLORE';
    CREATED_DATE: Date;
    MODIFIED_BY: string = 'TEAM XPLORE';
    MODIFIED_DATE: Date;
    DELETED: boolean = false;
    IS_REPLAY_COMMENT: boolean = false;
    REPLAY_COMMENT: string;
    REPLAY_COMMENT_HEADER_ID: number;
    REPLAY_COMMENT_ID: number;
    replies: ReelsCommentsDetails[] =  [];
    IS_LIKED: boolean = false;
    isClickOnLike: boolean = false;
    IS_REPLAY_LIKES: number;
    IS_REPLAY_LIKED: boolean = false;
    LIKE_OR_DISLIKE: boolean = false;
    USER_NAME: string = "";
}
export class ReelsCommentsLikes {
    COMMENT_LIKE_ID: number;
    REELS_COMMENTS_DETAILS_ID: number;
    USER_ID: number;
    CREATED_BY: string = 'TEAM XPLORE';
    CREATED_DATE: Date;
    MODIFIED_BY: string = 'TEAM XPLORE';
    MODIFIED_DATE: Date;
    DELETED: boolean = false;
}
export class UserFollowDetails {
    USER_FOLLOW_ID: number;
    USER_FOLLOWERS_ID?: number;
    USER_ID?: number;
    CREATED_BY: string;
    CREATED_DATE: Date;
    MODIFIED_BY: string;
    MODIFIED_DATE: Date;
    DELETED: boolean;
}
export class ReelSaved {
    REELS_SAVED_ID: number;
    REELS_DETAILS_ID: number;
    USER_ID: number;
    CREATED_BY: string;
    CREATED_DATE: Date;
    MODIFIED_BY: string;
    MODIFIED_DATE: Date;
    DELETED: boolean;
    isClickOnSave: boolean;
}



export const TimeSlots: string[] = [
    'Opening Time',
    'Closed',
    '1 AM',
    '2 AM',
    '3 AM',
    '4 AM',
    '5 AM',
    '6 AM',
    '7 AM',
    '8 AM',
    '9 AM',
    '10 AM',
    '11 AM',
    '12 AM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
    '5 PM',
    '6 PM',
    '7 PM',
    '8 PM',
    '9 PM',
    '10 PM',
    '11 PM',
    '12 PM'
  ];
