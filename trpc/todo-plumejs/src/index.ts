import { Component, html } from '@plumejs/core';
import './todo';

@Component({
  selector: 'test-ele'
})
class TestElement {
  render() {
    return html`<div data-testid="test-ele">
      <p>i'm child element</p>
      <p></p>
    </div>`;
  }
}

@Component({
  selector: 'app-root',
  styles: import('./styles/styles.scss?inline'),
  root: true
})
export class AppComponent {
  render() {
    return html`<app-todo></app-todo>`;
  }
}
