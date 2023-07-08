export interface Users{
    userName: string;
    followers: Array<string>;
    followersCount: number;
    followings: Array<string>;
    followingsCount: Array<string>;
  }

export interface Content{
    id: string;
    postedUserId: string;
    questionContent: string;
    questionTitle: string;
    timestamp: Date;
    type: string;
    answer: string;
}