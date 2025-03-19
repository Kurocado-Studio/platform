import { get } from 'lodash-es';

import type { AuthOktaUser, User, UserToken } from './types';

export class OktaUser implements AuthOktaUser {
  address: string;
  birthdate: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  gender: string;
  given_name: string;
  locale: string;
  middle_name: string;
  name: string;
  nickname: string;
  phone_number: string;
  phone_number_verified: boolean;
  picture: string;
  preferred_username: string;
  profile: string;
  sub: string;
  updated_at: string;
  website: string;
  zoneinfo: string;

  private constructor(user: Partial<AuthOktaUser>) {
    this.address = get(user, ['address'], '');
    this.birthdate = get(user, ['birthdate'], '');
    this.email = get(user, ['email'], '');
    this.email_verified = get(user, ['email_verified'], false);
    this.family_name = get(user, ['family_name'], '');
    this.gender = get(user, ['gender'], '');
    this.given_name = get(user, ['given_name'], '');
    this.locale = get(user, ['locale'], '');
    this.middle_name = get(user, ['middle_name'], '');
    this.name = get(user, ['name'], '');
    this.nickname = get(user, ['nickname'], '');
    this.phone_number = get(user, ['phone_number'], '');
    this.phone_number_verified = get(user, ['phone_number_verified'], false);
    this.picture = get(user, ['picture'], '');
    this.preferred_username = get(user, ['preferred_username'], '');
    this.profile = get(user, ['profile'], '');
    this.sub = get(user, ['sub'], '');
    this.updated_at = get(user, ['updated_at'], '');
    this.website = get(user, ['website'], '');
    this.zoneinfo = get(user, ['zoneinfo'], '');
  }

  public static create = (user: Partial<AuthOktaUser>): AuthOktaUser => {
    return new OktaUser(user);
  };
}

export class OrgUser implements User {
  address: string;
  birthdate: string;
  email: string;
  emailVerified: boolean;
  familyName: string;
  gender: string;
  givenName: string;
  locale: string;
  middleName: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  picture: string;
  preferredUsername: string;
  profile: string;
  sub: string;
  updatedAt: string;
  website: string;
  zoneInfo: string;

  constructor(user?: Partial<User>) {
    this.address = get(user, ['address'], '');
    this.birthdate = get(user, ['birthdate'], '');
    this.email = get(user, ['email'], '');
    this.emailVerified = get(user, ['emailVerified'], false);
    this.familyName = get(user, ['familyName'], '');
    this.gender = get(user, ['gender'], '');
    this.givenName = get(user, ['givenName'], '');
    this.locale = get(user, ['locale'], '');
    this.middleName = get(user, ['middleName'], '');
    this.name = get(user, ['name'], '');
    this.nickname = get(user, ['nickname'], '');
    this.phoneNumber = get(user, ['phoneNumber'], '');
    this.phoneNumberVerified = get(user, ['phoneNumberVerified'], false);
    this.picture = get(user, ['picture'], '');
    this.preferredUsername = get(user, ['preferredUsername'], '');
    this.profile = get(user, ['profile'], '');
    this.sub = get(user, ['sub'], '');
    this.updatedAt = get(user, ['updated_at'], '');
    this.website = get(user, ['website'], '');
    this.zoneInfo = get(user, ['zoneinfo'], '');
  }

  public static create = (authOktaUser?: Partial<User>): User => {
    return new OrgUser(authOktaUser);
  };
}

export class OrgUserToken implements UserToken {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  refreshToken: string;
  scope: string;

  private constructor(token?: Partial<UserToken>) {
    this.accessToken = get(token, ['accessToken'], '');
    this.expiresIn = get(token, ['expiresIn'], 0);
    this.idToken = get(token, ['idToken'], '');
    this.refreshToken = get(token, ['refreshToken'], '');
    this.scope = get(token, ['scope'], '');
  }

  public static create = (token?: Partial<UserToken>): UserToken => {
    return new OrgUserToken(token);
  };
}
