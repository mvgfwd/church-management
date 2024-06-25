import { FormArray, FormGroup, FormControl } from "@angular/forms";

export type FormGroupOf<T> = {
    [key in keyof T]: T[key] extends Array<infer TArray>
      ? FormArray<
          TArray extends object
            ? FormGroup<FormGroupOf<TArray>>
            : FormControl<TArray | null | undefined>
        >
      : T[key] extends object
      ? FormGroup<FormGroupOf<T[key]>>
      : FormControl<T[key] | null | undefined>;
  };