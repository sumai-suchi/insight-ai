import { Document } from "mongoose";

export interface IHistory extends Document {
  userId: string;
  articleId: string;
  title: string;
  url: string;
  urlToImage: string;
  sourceName: string;
  category: string;
  publishedAt: Date;
  readAt: Date;
}
