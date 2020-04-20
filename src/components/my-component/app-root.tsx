import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  shadow: true
})
export class AppRoot {
  public render() {
    return (
      <div>
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url='/' component='app-datepicker' exact={true} />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
