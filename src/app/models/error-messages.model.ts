import { AbstractControl, Validators } from "@angular/forms";

export const getErrorMessage = (formControl: AbstractControl | null): string => {
  if (!formControl || !formControl.errors || Object.keys(formControl.errors).length === 0) {
    return '';
  }

  // Get the first error message
  const errorName = Object.keys(formControl.errors)[0];
  let errorMessage = '';

  switch(errorName) {
    // Hardcoded because the validators name come back in a weird casing
    case 'minlength': {
      errorMessage = `Must be ${formControl.errors.minlength.requiredLength} characters long`;
      break;
    }
    // Hardcoded because the validators name come back in a weird casing
    case 'maxlength': {
      errorMessage = `Must be less than ${formControl.errors.maxlength.requiredLength} characters long`;
      break;
    }
    case Validators.required.name: {
      errorMessage = `This field is required`;
      break;
    }
    case Validators.email.name: {
      errorMessage = `Please enter a valid email address`;
      break;
    }
  }

  return errorMessage;
}
