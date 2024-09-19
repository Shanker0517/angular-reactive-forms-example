import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-component3',
  standalone: true,
  imports: [],
  templateUrl: './component3.component.html',
  styleUrl: './component3.component.css'
})
export class Component3Component {
  @Output() progressBar = new EventEmitter<number>();

}