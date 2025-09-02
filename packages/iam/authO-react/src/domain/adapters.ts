import { get } from 'lodash-es';

import { OktaUser, OrgUser, OrgUserToken } from './models';
import type {
  AuthOktaToken,
  AuthOktaUser,
  AuthOktaUserAdapter,
  User,
  UserAdapter,
  UserToken,
} from './types';

export class OktaUserAdapter implements AuthOktaUserAdapter {
  public static create = (): AuthOktaUserAdapter => new OktaUserAdapter();

  toUser = (authOktaUser?: Partial<AuthOktaUser>): User => {
    const orgUser = {
      address: get(authOktaUser, ['address']),
      birthdate: get(authOktaUser, ['birthdate']),
      email: get(authOktaUser, ['email']),
      emailVerified: get(authOktaUser, ['email_verified']),
      familyName: get(authOktaUser, ['family_name']),
      gender: get(authOktaUser, ['gender']),
      givenName: get(authOktaUser, ['given_name']),
      locale: get(authOktaUser, ['locale']),
      middleName: get(authOktaUser, ['middle_name']),
      name: get(authOktaUser, ['name']),
      nickname: get(authOktaUser, ['nickname']),
      phoneNumber: get(authOktaUser, ['phone_number']),
      phoneNumberVerified: get(authOktaUser, ['phone_number_verified']),
      picture: get(authOktaUser, ['picture']),
      preferredUsername: get(authOktaUser, ['preferred_username']),
      profile: get(authOktaUser, ['profile']),
      sub: get(authOktaUser, ['sub']),
      updatedAt: get(authOktaUser, ['updated_at']),
      website: get(authOktaUser, ['website']),
      zoneInfo: get(authOktaUser, ['zoneinfo']),
    };

    return OrgUser.create(orgUser);
  };

  toUserToken = (token?: Partial<AuthOktaToken>): UserToken => {
    const userToken = {
      accessToken: get(token, ['access_token']),
      expiresIn: get(token, ['expires_in']),
      idToken: get(token, ['id_token']),
      refreshToken: get(token, ['refresh_token']),
      scope: get(token, ['scope']),
    };

    return OrgUserToken.create(userToken);
  };
}

export class OrgUserAdapter implements UserAdapter {
  public static create = (): UserAdapter => new OrgUserAdapter();

  toAuthOktaUser = (user: Partial<User>): AuthOktaUser => {
    const oktaUser = {
      address: get(user, ['address']),
      birthdate: get(user, ['birthdate']),
      email: get(user, ['email']),
      email_verified: get(user, ['emailVerified']),
      family_name: get(user, ['familyName']),
      gender: get(user, ['gender']),
      given_name: get(user, ['givenName']),
      locale: get(user, ['locale']),
      middle_name: get(user, ['middleName']),
      name: get(user, ['name']),
      nickname: get(user, ['nickname']),
      phone_number: get(user, ['phoneNumber']),
      phone_number_verified: get(user, ['phoneNumberVerified']),
      picture: get(user, ['picture']),
      preferred_username: get(user, ['preferredUsername']),
      profile: get(user, ['profile']),
      sub: get(user, ['sub']),
      updated_at: get(user, ['updatedAt']),
      website: get(user, ['website']),
      zoneinfo: get(user, ['zoneInfo']),
    };

    return OktaUser.create(oktaUser);
  };
}
