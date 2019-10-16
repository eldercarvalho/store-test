import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/material.module';
import { HeaderComponent } from './header/header.component';
import { AvatarComponent } from './avatar/avatar.component';

const COMPONENTS =  [
  HeaderComponent,
  AvatarComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: COMPONENTS
})
export class ComponentsModule { }
