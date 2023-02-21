import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})


export class SearchMovieComponent implements OnInit {
  public inValidate = false;

 lesTypes = ["film", "série", "épisode"];
 lesFiches = ["complète", "courte"];
 typeInit = "série";

  constructor(private fb: FormBuilder) { }

    formGroup = this.fb.group({
     title: new FormGroup({
        identifiant: new FormControl('Hello Identifiant'),
        titre: new FormControl('Hello titre'),
      }, {validators: [isRequiredValidator('identifiant', 'titre')]}),
      types: new FormControl(this.lesTypes, Validators.required),
      anneesortie: new FormControl(1900, {validators: [rangeDateValidator(1920)]}),
      fiches: new FormControl(this.lesFiches, Validators.required)
    })

  ngOnInit(): void {
    this.formGroup.patchValue({
      fiches: ["complète"]
    })
  };

  filmSearch() {
    console.log(JSON.stringify(this.formGroup.value));
  };

  handleValidate() {
    this.inValidate = true
  }
}
interface ValidatorFn {
  (control: AbstractControl<any, any>): ValidationErrors | null
}

export function isRequiredValidator(identifiant: string, titre: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value1 = control.get(identifiant)?.value;

    const value2 = control.get(titre)?.value;

    if (value1 === "") {
      return  Validators.required;
    } else if (value2 === "") {
      return  Validators.required
    } else {
      return null;
    }
  };
}

export function rangeDateValidator(anneesortie: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value1 = anneesortie
    const date = new Date()

    if (value1 > date.getFullYear() && value1 < 1900) {
      return  Validators.required;
    } else {
      return null;
    }
  };
}



