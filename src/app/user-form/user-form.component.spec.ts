import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { UserFormComponent } from './user-form.component';

fdescribe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [FormsModule, ReactiveFormsModule, MatAutocompleteModule],
      providers: [provideMockStore({
        initialState: {
          root: {
            formInfoLoaded: true
          }
        }
      })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submitForm', () => {
    it('should not submit when the form is invalid', () => {
      const storeMock = TestBed.inject(Store);
      spyOn(storeMock, 'dispatch').and.callFake(() => {});
      component.userForm.reset();
      expect(component.userForm.invalid).toBeTrue();
      component.submitForm();
      expect(storeMock.dispatch).not.toHaveBeenCalled();
    });

    it('should submit when the form is valid', () => {
      const storeMock = TestBed.inject(Store);
      spyOn(storeMock, 'dispatch').and.callFake(() => {});
      component.userForm.setValue({
        name: 'Testing123',
        email: 'test@crouton.net',
        password: '123456789',
        occupation: 'Cool Job',
        state: 'WA'
      });

      expect(component.userForm.valid).toBeTrue();
      component.submitForm();
      expect(storeMock.dispatch).toHaveBeenCalled();
    });
  });
});
