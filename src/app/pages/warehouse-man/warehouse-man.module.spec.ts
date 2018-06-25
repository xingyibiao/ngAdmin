import { WarehouseManModule } from './warehouse-man.module';

describe('WarehouseManModule', () => {
  let warehouseManModule: WarehouseManModule;

  beforeEach(() => {
    warehouseManModule = new WarehouseManModule();
  });

  it('should create an instance', () => {
    expect(warehouseManModule).toBeTruthy();
  });
});
