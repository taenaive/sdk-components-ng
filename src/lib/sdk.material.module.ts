import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [ NoopAnimationsModule, MatDialogModule, MatBadgeModule, MatBottomSheetModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSidenavModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatTooltipModule, MatMenuModule, MatIconModule, MatGridListModule],
  exports: [ MatDialogModule, MatBadgeModule, MatBottomSheetModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSidenavModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatTooltipModule, MatMenuModule, MatIconModule, MatGridListModule],
})
export class SzSdkMaterialModule { }