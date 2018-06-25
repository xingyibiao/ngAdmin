import { FormDesignModule } from './form-design.module';

describe('FormDesignModule', () => {
  let formDesignModule: FormDesignModule;

  beforeEach(() => {
    formDesignModule = new FormDesignModule();
  });

  it('should create an instance', () => {
    expect(formDesignModule).toBeTruthy();
  });
});
