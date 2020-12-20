import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter<void>();

  constructor(private util: UtilService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.sidenavClose.emit();
  }

  onEnableNotifications() {
    this.util.enableNotifications();
  }

}
