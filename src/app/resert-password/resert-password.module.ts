import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResertPasswordPageRoutingModule } from './resert-password-routing.module';

import { ResertPasswordPage } from './resert-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResertPasswordPageRoutingModule
  ],
  declarations: [ResertPasswordPage]
})
export class ResertPasswordPageModule {}
