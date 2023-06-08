import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResertPasswordPage } from './resert-password.page';

const routes: Routes = [
  {
    path: '',
    component: ResertPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResertPasswordPageRoutingModule {}
