import { TokenPayload } from '@backend/shared/core';

export interface RequestWithTokenPayload {
  user?: TokenPayload;
}

export interface RequestWithTokenPayloadUrl {
  user?: TokenPayload;
  url?: string;
}
