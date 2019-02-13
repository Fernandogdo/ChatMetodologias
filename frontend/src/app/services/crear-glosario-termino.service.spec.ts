import { TestBed } from '@angular/core/testing';

import { CrearGlosarioTerminoService } from './crear-glosario-termino.service';

describe('CrearGlosarioTerminoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrearGlosarioTerminoService = TestBed.get(CrearGlosarioTerminoService);
    expect(service).toBeTruthy();
  });
});
