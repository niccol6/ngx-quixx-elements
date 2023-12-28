import { Component } from '@angular/core';

@Component({
  selector: 'app-sub-bulk',
  standalone: true,
  templateUrl: './sub-bulk.component.html',
})
export class SubBulkComponent {
  api = `import { SubBulk } from 'ngx-quixx-elements';`;
  snippet = `
  sub = new SubBulk();
  
  sub.add = observable1.subscribe();
  sub.add = observable2.subscribe();
  
  sub.unsubscribe();
  `;
}
