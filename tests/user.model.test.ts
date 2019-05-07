import 'jasmine';
import UserModel from '../src/Models/user.model';
import moment = require('moment');
import ScanModel from '../src/Models/scan.model';

describe('User Model', () => {

  it('should return false if no scans available' , () => {
      let user = new UserModel('123');
      expect(user.GetState()).toBeFalsy();
  });

  it('should return false if scan is too old' , () => {
      let user = new UserModel('123');
      user.scans.push(new ScanModel( moment().subtract(11, 'h').toDate() ));

      expect(user.GetState()).toBeFalsy();
  });

  it('should return false if logout scan is available' , () => {
      let user = new UserModel('123');
      user.scans.push(new ScanModel( moment().subtract(4, 'h').toDate()) );
      user.scans.push(new ScanModel( moment().subtract(5, 'h').toDate() ) );

      expect(user.GetState()).toBeFalsy();
  });

  it('should should have a true state' , () => {
      let user = new UserModel('123');
      user.scans.push(new ScanModel(new Date()));

      expect(user.GetState()).toBeTruthy();
  });

});