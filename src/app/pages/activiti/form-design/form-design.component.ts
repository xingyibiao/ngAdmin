import { Component, OnInit } from '@angular/core';
import { LeftControl, leftControls } from './left-controls';

@Component({
  selector: 'app-form-design',
  templateUrl: './form-design.component.html',
  styleUrls: ['./form-design.component.scss']
})
export class FormDesignComponent implements OnInit {

  // 左侧控件集合
  public leftControls: LeftControl[] = leftControls

  constructor() { }

  ngOnInit() {
  }

}


