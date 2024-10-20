import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonStatBarComponent } from './pokemon-stat-bar.component';

describe('PokemonStatBarComponent', () => {
  let component: PokemonStatBarComponent;
  let fixture: ComponentFixture<PokemonStatBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonStatBarComponent]
    });
    fixture = TestBed.createComponent(PokemonStatBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
