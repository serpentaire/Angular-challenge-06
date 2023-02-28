import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { isRequiredValidator, rangeDateValidator }  from '../shared/validators'
@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})


export class SearchMovieComponent implements OnInit {
  public formGroup: FormGroup;
  public inValidate = false;
  constructor(private _fb: FormBuilder) { }
  lesTypes = [
    {name : "film"},
    {name : "série"},
    {name : "épisode"}
  ];
  lesFiches = [
    {name: "complète"},
    {name: "courte"}
  ]
  date = new Date()
  min= 1900
  max = this.date.getFullYear()

  ngOnInit(): void {
    this.formGroup = this._fb.group({
      name: new FormGroup({
        identifant: new FormControl(''),
        titre: new FormControl('')
      }, {validators: isRequiredValidator('titre','identifant')}),
      types: new FormControl(this.lesTypes[1].name, Validators.required),
      anneeDeSortie: new FormControl(null , {validators: rangeDateValidator(this.min,this.max)}),
      fiches: new FormControl([])
    })
    this.formGroup.patchValue({
      fiches: this.lesFiches[0].name
    })

  }
  handleValidate() {
    this.inValidate = true
  }
  
  onSubmit() {
    console.log(JSON.stringify(this.formGroup.value));
  }

}




