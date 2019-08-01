import { CommonModule } from '@angular/common';
import { NgModule, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';


@NgModule({
    imports: [CommonModule, FormsModule, SharedModule, ReactiveFormsModule],
    declarations: []
})
export class ParamsDetailsModule {

}
