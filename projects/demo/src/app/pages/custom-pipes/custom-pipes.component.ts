import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-pipes',
  standalone: true,
  templateUrl: './custom-pipes.component.html',
})
export class CustomPipesComponent {
  distinctUntilChangedArrayApi = `import { distinctUntilChangedArray } from 'ngx-quixx-elements';`;
  distinctUntilChangedArraySnippet = `
  obs1 = new Subject<number[]>();
  obs2 = this.obs1.pipe(distinctUntilChangedArray());
  `;
}
