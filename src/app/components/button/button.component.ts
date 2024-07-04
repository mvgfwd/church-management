import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() size: 'small' | 'medium' | 'large' | 'full' | undefined = 'medium';
  @Input() color:
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'error'
    | 'success'
    | 'white'
    | undefined = 'primary';
  @Input() round: 'large' | undefined = 'large';
  @Input() disableTerm: boolean = false;
  @Input() type: string = 'submit';
  @Input() addClass: string = ' ';
  @Input() buttonAddClass: string = ' ';
  @Output() onButtonClick: EventEmitter<void> = new EventEmitter<void>();

  // CSS Class
  colorClass: string = '';
  sizeClass: string = '';
  roundClass: string = '';
  heroStyle: string = '';
  heroContainer: string = '';
  addedClass: string = '';

  onClick(): void {
    this.onButtonClick.emit();
  }

  ngOnInit(): void {
    this.setRound();
    this.setSize();
    this.setColor();
    this.setAddedClass();
  }

  setAddedClass() {
    if (this.addClass) {
      this.addedClass = this.addClass;
    }
  }

  setRound(): void {
    switch (this.round) {
      case 'large': {
        this.roundClass = ' rounded-lg ';
        break;
      }
    }
  }

  setSize(): void {
    switch (this.size) {
      case 'large': {
        this.sizeClass = ' px-8 h-12 text-lg font-semibold w-auto';
        this.heroContainer = ' mr-4 h-6 w-6 ';
        break;
      }
      case 'full': {
        this.sizeClass = ' text-lg font-bold w-full px-4 py-2 ';
        this.heroContainer = ' mr-2 h-5 font-bold w-5 ';
        break;
      }
      case 'small': {
        this.sizeClass = ' px-2 h-6 py-2 text-xs w-auto ';
        this.heroContainer = 'mr-2 h-3 w-3 ';
        break;
      }
      case 'medium': {
        this.sizeClass =
          ' px-2 h-8 py-2 text-sm w-auto border border-transparent';
        this.heroContainer = 'mr-2 h-3 w-3 ';
        break;
      }
    }
  }

  setColor(): void {
    switch (this.color) {
      case 'primary': {
        this.colorClass =
          ' bg-cm-blue-500 text-white text-sm hover:bg-cm-blue-600 hover:text-white';
        this.heroStyle = ' text-neutral-50 ';
        break;
      }
      case 'secondary': {
        this.colorClass =
          'border border-cm-blue-500 text-cm-blue-500 hover:bg-cm-blue-50 hover:text-cm-blue-700';
        this.heroStyle = ' text-usm-brown-500 ';
        break;
      }
      case 'white': {
        this.colorClass = 'border border-white text-white';
        this.heroStyle = ' text-white ';
        break;
      }
      case 'warning': {
        this.colorClass =
          ' bg-yellow-500 hover:bg-yellow-600 font-jakarta text-white ';
        this.heroStyle = ' text-white ';
        break;
      }
      case 'error': {
        this.colorClass =
          'bg-red-500 border border-red-500 hover:text-red-700 text-red-600 bg-white hover:bg-red-100';
        this.heroStyle = ' text-red-300 ';
        break;
      }
      case 'success': {
        this.colorClass = ' bg-green-500 hover:bg-green-600 text-white ';
        this.heroStyle = ' text-white ';
        break;
      }
      default: {
        this.colorClass =
          ' bg-cm-blue-500 text-white hover:bg-cm-blue-600 text-neutral-50 ';
        this.heroStyle = ' text-neutral-50 ';
        break;
      }
    }
  }
}
