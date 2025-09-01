import {
  OktaUser,
  OrgUser,
  OrgUserAdapter,
  type User,
  type UserAdapter,
} from '../../src';

describe('OrgUserAdapter', () => {
  let adapter: UserAdapter;

  beforeEach(() => {
    adapter = OrgUserAdapter.create();
  });

  describe('create', () => {
    it('should create a new instance of OktaUserAdapter', () => {
      expect(adapter).toBeInstanceOf(OrgUserAdapter);
    });
  });

  describe('toAuthOktaUser', () => {
    it('should transform a User object into a AuthOktaUser object', () => {
      const user: User = OrgUser.create({
        email: 'test@example.com',
        givenName: 'John',
        familyName: 'Doe',
      });

      const authOktaUser = adapter.toAuthOktaUser(user);

      expect(authOktaUser).toStrictEqual(
        OktaUser.create({
          address: '',
          birthdate: '',
          email: authOktaUser.email,
          email_verified: false,
          family_name: authOktaUser.family_name,
          gender: '',
          given_name: authOktaUser.given_name,
          locale: '',
          middle_name: '',
          name: '',
          nickname: '',
          phone_number: '',
          phone_number_verified: false,
          picture: '',
          preferred_username: '',
          profile: '',
          sub: '',
          updated_at: '',
          website: '',
          zoneInfo: '',
        }),
      );
    });

    it('should always create an instance of OrgUser', () => {
        const user = adapter.toAuthOktaUser({});
        expect(user).toBeInstanceOf(OktaUser);

    });
  });
});
