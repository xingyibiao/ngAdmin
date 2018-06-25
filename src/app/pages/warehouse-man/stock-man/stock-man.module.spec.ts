import { StockManModule } from './stock-man.module';

describe('StockManModule', () => {
  let stockManModule: StockManModule;

  beforeEach(() => {
    stockManModule = new StockManModule();
  });

  it('should create an instance', () => {
    expect(stockManModule).toBeTruthy();
  });
});
