export interface Users {
  type: string;
  userName: string;
  followers: Array<string>;
  followersCount: number;
  followings: Array<string>;
  followingsCount: Array<string>;
  groupDescrp: String;
  groupMemberCount: number;
  groupMembers: Array<string>;
}

export interface Content {
  id: string;
  postedUserID: string;
  questionContent: string;
  answerContent: string;
  questionTitle: string;
  timestamp: Date;
  type: string;
  answer: string;
}