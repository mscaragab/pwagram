import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private util: UtilService) {}

  ngOnInit(): void {}

  onToggle() {
    this.sidenavToggle.emit();
  }

  onEnableNotifications() {
    this.util.enableNotifications();
  }
}
