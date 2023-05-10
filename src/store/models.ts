import { UUID } from 'crypto';

export type Id = UUID;

export interface Credentials {
  alias: string;
  password: string;
}

export type Token = string;

export interface CaptchaTask {
  token: Token;
  image: string;
}

export interface CaptchaSolution {
  token: Token;
  secret: string;
}

export interface UserCreateBody {
  captcha: CaptchaSolution;
  credentials: Credentials;
}

export interface UserInfo {
  id: Id;
  name: string;
  alias: string;
  about: string;
  updated_at: string;
}

export type UserPrivateInfo = UserInfo & {
  favorites: Id[];
};

export type UserUpdate = Partial<
  Pick<UserPrivateInfo, 'name' | 'alias' | 'about' | 'favorites'>
> & {
  password?: {
    old: string;
    new: string;
  };
};

export interface Chat {
  id: Id;
  alias: string;
  name: string;
  about: string;
  updated_at: string;
}

export interface ChatCreateBody {
  info: Pick<Chat, 'alias'> & Partial<Pick<Chat, 'name' | 'about'>>;
  captcha: CaptchaSolution;
}

export interface Session {
  access_token: Token;
  refresh_token: Token;
}

export interface SessionInfo {
  id: Id;
  agent: string;
  updated_at: string;
}

export type SessionUpdate = Pick<Session, 'refresh_token'>;

export interface MessageMention {
  user: Id;
  chat: Id;
  type: 'message';
}

export interface ChatMention {
  chat: Id;
  type: 'chat';
}

export interface UserMention {
  user: Id;
  type: 'user';
}

export type Mention = MessageMention | UserMention | ChatMention;

export interface MessageTextFragment {
  text: string;
  type: 'text';
}

export interface MessageLinkFragment {
  text: string;
  link: string;
  type: 'link';
}

export interface MessageMentionFragment {
  mention: Mention;
  type: 'mention';
}

export type MessageFragment = MessageTextFragment | MessageLinkFragment | MessageMentionFragment;

export interface MessageText {
  fragments: MessageFragment[];
  type: 'text';
}

export interface MessageFiles {
  data: Id[];
  description?: string;
  type: 'files';
}

export type MessageBody = MessageText | MessageFiles;

export interface Message {
  chat: Id;
  author: Id;
  body: MessageBody;
  id: Id;
  replied_to?: Id;
  forwarded_from?: Id;
  updated_at: string;
  created_at: string;
}

export interface QueryFilter {
  created_before?: Date;
  limit?: number;
}

export type MessageCreateBody = Pick<Message, 'replied_to' | 'forwarded_from'> & {
  body: string | MessageBody;
};

export type MessageUpdate = Pick<Message, 'body'>;

export type IdPathParameter<TKey extends string> = {
  [key in TKey]: Id;
};

export type ObjectList<TKey extends string, TValue> = {
  [key in TKey]: TValue[];
};

export interface Error {
  alias: string;
  attributes: {
    message?: string;
  };
}

interface EventModel<TEventType extends string, TMessage> {
  type: TEventType;
  message: TMessage;
}

export type EventChatCreated = EventModel<'chat_created', Chat>;
export type EventUserCreated = EventModel<'user_created', UserInfo>;
export type EventUserUpdated = EventModel<'user_updated', UserInfo>;
export type EventUserDeleted = EventModel<'user_deleted', Id>;
export type EventMessageCreated = EventModel<'message_created', Message>;
export type EventMessageUpdated = EventModel<'message_updated', Message>;
export type EventMessageDeleted = EventModel<'message_deleted', Id>;

export type Event =
  | EventChatCreated
  | EventUserCreated
  | EventUserUpdated
  | EventUserDeleted
  | EventMessageCreated
  | EventMessageUpdated
  | EventMessageDeleted;
