export interface AuthBody {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

export type Id = string;

export interface Chat {
  id: Id;
  alias: string;
  name: string;
  about: string;
  updated_at: Date;
}

export interface MessageText {
  data: string;
}

export interface MessageFiles {
  data: Id[];
  description?: string;
}

export interface Message {
  chat: Id;
  author: Id;
  body: MessageText | MessageFiles;
  id: Id;
  replied_to: Id;
  forwarded_from: Id;
  updated_at: Date;
  created_at: Date;
}

export type MessageUpdate = Pick<Message, 'id' | 'chat'> & Partial<Pick<Message, 'body'>>;
