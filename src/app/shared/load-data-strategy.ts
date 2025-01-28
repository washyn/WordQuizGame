import { Injector } from '@angular/core';
import { LocalStorageStrategy } from './local-storage-strategy';
import { LocalCSVStrategy } from './local-csv-strategy';

export const LOAD_DATA_STRATEGY = {
  LocalStorage(injector: Injector) {
    return new LocalStorageStrategy(injector);
  },
  File(injector: Injector) {
    return new LocalCSVStrategy(injector);
  },
};
