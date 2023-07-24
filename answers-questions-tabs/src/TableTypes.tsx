export interface Users{
    userName: string;
    followers: Array<string>;
    followersCount: number;
    followings: Array<string>;
    followingsCount: Array<string>;
  }

export interface Content{
    id: string;
    postedUserID: string;
    questionContent: string;
    answerContent: string;
    questionTitle: string;
    timestamp: Date;
    type: string;
    answer: string;
}