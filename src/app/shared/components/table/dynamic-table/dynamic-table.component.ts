import {
  AfterViewInit,
  booleanAttribute,
  Component, computed,
  effect, HostListener,
  input, model,
  OnInit,
  output, signal,
  ViewChild
} from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SelectionModel } from '@angular/cdk/collections';
import { Key } from '@wow/shared/interfaces';
import { fadeInUp400ms, stagger40ms } from '@wow/shared/animations';
import { TableColumn, ColumnCellAction } from '../table';

@Component({
  selector: 'wow-dynamic-table',
  imports: [
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTooltipModule,
    NgClass,
    DatePipe
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
  animations: [fadeInUp400ms, stagger40ms]
})
export class WowDynamicTable<T> implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  data = input.required<T[]>();
  columns = input<TableColumn<T>[]>([]);
  showHeaderCheckbox = input<boolean>(false)
  showRowCheckbox = input<boolean>(false);
  showDropdownMenu = input(false, {transform: booleanAttribute});
  dropdownMenu = input<MatMenu>(new MatMenu());
  selectionRows = model<T[]>();
  isLoading = input<boolean>(false);
  skeletonRows = input<number>(10);
  loadingRows = computed(() => new Array(this.skeletonRows()));

  rowDblClick = output<T>();
  addTag = output<ColumnCellAction<T>>();
  cellCtrlClick = output<ColumnCellAction<T>>();

  ctrlPressed = signal(false);
  hoveredCell = signal<{ rowIndex: number; columnProperty: string } | null>(null);

  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<T>;
  selection: SelectionModel<T> = new SelectionModel<T>(true, []);

  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
    });
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  onDblClick(row: T): void {
    this.rowDblClick.emit(row);
  }

  onAddTag(column: Extract<keyof T, string>, row: T): void {
    this.addTag.emit({ column, data: row });
  }

  onCellCtrlClick(event: MouseEvent, column: Extract<keyof T, string>, row: T, allowCtrlClick: boolean = false): void {
    if (event.ctrlKey && allowCtrlClick) {
      this.cellCtrlClick.emit({ column, data: row });
    } else {
      event.stopPropagation();
    }
  }

  isCtrlHoverActive(i: number, columnProperty: string, allowCtrlClick: boolean = false): boolean {
    return (
      this.ctrlPressed() &&
      this.hoveredCell()?.rowIndex === i &&
      this.hoveredCell()?.columnProperty === columnProperty &&
      allowCtrlClick
    );
  }

  selectAll(event: MatCheckboxChange): void {
    if (event) {
      this.masterToggle();
    }
    this.selectionRows.set(this.selection.selected);
  }

  selectRow(event: MatCheckboxChange, row: T): void {
    if (event) {
      this.selection.toggle(row)
    }
    this.selectionRows.set(this.selection.selected);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  get visibleColumns(): string[] {
    let columns: string[] = this.columns()
      .filter(col => col.visible)
      .map(col => String(col.property));

    if (this.showRowCheckbox()) {
      columns = ['table_checkbox_column', ...columns];
    }

    if (this.showDropdownMenu()) {
      columns = [...columns, 'dropdown_menu_column'];
    }

    return columns;
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.ctrlKey) {
      this.ctrlPressed.set(true);
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === Key.Control) {
      this.ctrlPressed.set(false);
    }
  }

}
