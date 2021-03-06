import { TestBed } from '@angular/core/testing';
import { ToasterService } from '../../services/toaster.service';
import { MockedToasterService } from '../../services/toaster.service.spec';
import { ToasterErrorHandler } from './toaster-error-handler';
import { RavenErrorHandler } from './raven-error-handler';
import { SettingsService } from '../../services/settings.service';
import { MockedSettingsService } from '../../services/settings.service.spec';
import { Injector } from '@angular/core';

class MockedToasterErrorHandler extends ToasterErrorHandler {
  handleError(err: any): void {
    const toasterService = this.injector.get(ToasterService);
    toasterService.error(err.message);
  }
}

describe('ToasterErrorHandler', () => {
  let handler: ToasterErrorHandler;
  let toasterService: MockedToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ToasterService, useClass: MockedToasterService },
        { provide: SettingsService, useClass: MockedSettingsService },
        RavenErrorHandler,
        ToasterErrorHandler
      ]
    });

    handler = new MockedToasterErrorHandler(TestBed.get(Injector));
    toasterService = TestBed.get(ToasterService);
  });

  it('should call toaster with error message', () => {
    handler.handleError(new Error('message'));

    expect(toasterService.errors).toEqual(['message']);
  });
});
