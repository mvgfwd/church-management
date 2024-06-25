import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit, OnChanges {
  // input setting
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() required:boolean = false;
  @Input() style: string = '';
  @Input() size: string = 'p-2.5';
  @Input() oninput: any;
  @Input() description: string = '';
  @Input() tooltip: string = '';
  @Input() validatorIcon: boolean = true;
  @Input() control = new FormControl();
  @Input() isDisabled: boolean = false;
  @Input() borderLine: boolean = true;
  @Input() borderStyle:string='';
  @Input() placeholder: string = '';
  @Input() isPassword: boolean = false;
  @Input() isTextArea: boolean = false;
  @Input() textValue:string ='';
  @Input() value: string ='';
  @Input() inputType:
    | 'text'
    | 'number'
    | 'date'
    | 'datetime'
    | 'checkbox'
    | 'datetime-local'
    | 'password' = 'text';
  // End of input setting

  borderData: string = '';
  focus: boolean=false;

  // error message
  errorMessage: Record<string, string> = {
    required: 'The field is required',
    email: 'The e-mail is invalid',
    max: 'The input is exceeding maximum limit',
    maxlength: 'The input is exceeding maximum char length limit',
    min: 'The input is below minimum limit',
    minlength: 'The input is below minimum char limit',
    pattern: 'Input Field Value Not Allowed'
  };
  // End of error message

  inputTypePassword: 'text' | 'password' = 'password'

  ngOnInit(): void {
    if (this.borderLine) {
      this.borderData = '1px solid #006298';
    }
    if(this.borderStyle){
      this.borderStyle = 'border border-sda-pri-500'
    }
    if(this.isDisabled){
      this.style="background-color:#F5F5F5; border:1px solid #9E9E9E; color:#616161;"
    }
  }

  ngOnChanges(){
    if(!this.isDisabled){
      this.style="background-color:#FFF"
    }else{
      this.style="background-color:#F5F5F5"
    }
  }

  onFocus() {
    this.focus = true;
  }

  onBlur() {
    this.focus = false;
  }

  togglePasswordVisibility() {
    if (this.inputTypePassword === 'text') {
      this.inputTypePassword = 'password'
    } else {
      this.inputTypePassword = 'text'
    }
  }
}
