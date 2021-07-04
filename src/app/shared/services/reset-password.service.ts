import { Injectable } from '@angular/core';
import { HttpRequestsService } from './http-requests.service';

@Injectable()
export class ResetPasswordService {
  private _email: string;
  constructor(private httpRequestService: HttpRequestsService) {}

  sendResetCode(email: string) {
    this._email = email;
    return this.httpRequestService.snedResetCode(this._email);
  }

  checkResetCode(code: string) {
    return this.httpRequestService.checkResetCode(code, this._email);
  }

  updatePassword(password: string) {
    return this.httpRequestService.updatePassword(password, this._email);
  }
}
