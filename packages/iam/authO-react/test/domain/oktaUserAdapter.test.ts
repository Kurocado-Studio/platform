import { faker } from '@kurocado-studio/qa';

import {
  type AuthOktaToken,
  type AuthOktaUser,
  type AuthOktaUserAdapter,
  OktaUserAdapter,
  OrgUser,
  OrgUserToken,
} from '../../src';

describe('OktaUserAdapter', () => {
  let adapter: AuthOktaUserAdapter;

  beforeEach(() => {
    adapter = OktaUserAdapter.create();
  });

  describe('create', () => {
    it('should create a new instance of OktaUserAdapter', () => {
      expect(adapter).toBeInstanceOf(OktaUserAdapter);
    });
  });

  describe('toUser', () => {
    it('should transform a AuthOktaUser object into a User object', () => {
      const authOktaUser: Partial<AuthOktaUser> = {
        email: faker.internet.email(),
        given_name: faker.person.firstName(),
        family_name: faker.person.lastName(),
      };

      const user = adapter.toUser(authOktaUser);

      expect(user).toStrictEqual(
        OrgUser.create({
          address: '',
          birthdate: '',
          email: authOktaUser.email,
          emailVerified: false,
          familyName: authOktaUser.family_name,
          gender: '',
          givenName: authOktaUser.given_name,
          locale: '',
          middleName: '',
          name: '',
          nickname: '',
          phoneNumber: '',
          phoneNumberVerified: false,
          picture: '',
          preferredUsername: '',
          profile: '',
          sub: '',
          updatedAt: '',
          website: '',
          zoneInfo: '',
        }),
      );
    });

    it('should always create an instance of OrgUser', () => {
        const user = adapter.toUser({});
        expect(user).toBeInstanceOf(OrgUser);
    });
  });

  describe('toUserToken', () => {
    it('should always create an instance of OrgUserToken', () => {

        const tokenPayload = adapter.toUserToken({});
        expect(tokenPayload).toBeInstanceOf(OrgUserToken);
    });

    it('should transform a AuthOktaToken object into a OrgUserToken object', () => {
      const token: AuthOktaToken = {
        access_token: faker.string.uuid(),
        id_token: faker.internet.jwt(),
        expires_in: faker.number.int(),
      };

      const userToken = adapter.toUserToken(token);

      expect(userToken).toStrictEqual(
        OrgUserToken.create({
          accessToken: token.access_token,
          expiresIn: token.expires_in,
          idToken: token.id_token,
          refreshToken: '',
          scope: '',
        }),
      );
    });
  });
});
