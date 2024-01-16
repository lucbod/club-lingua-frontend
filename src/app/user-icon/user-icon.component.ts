import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-icon',
  template: `
    <div class="user-icon">
      <img src="/assets/icons/icon-person.png" alt="person icon" />
      <span>{{ username }}</span>
    </div>
  `,
  styles: [
    `
      .user-icon {
        display: flex;
        align-items: center;
      }
      img {
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }
    `,
  ],
})
export class UserIconComponent {
  @Input() username: string = '';
}
