import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { take, tap } from 'rxjs';
import { User, UserData } from '../../../../services/models/user.model';
import { UserDataService } from '../../../../services/state/user/user-data.service';
import { AddUserDialogComponent } from '../../../shared/dialogs/add-user-dialog/add-user-dialog.component';
import { DeleteConfirmationComponent } from '../../../shared/dialogs/delete-confirmation/delete-confirmation.component';
import { UpdateUserDialogComponent } from '../../../shared/dialogs/update-user-dialog/update-user-dialog.component';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSortHeader,
    MatCell,
    MatCellDef,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatNoDataRow,
    MatPaginator,
    MatLabel,
    MatInput,
    MatMiniFabButton,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<UserData>;
  displayedColumns: Iterable<string> = [
    'idNumber',
    'firstName',
    'lastName',
    'actions',
  ];

  constructor(
    private dialog: MatDialog,
    private userDataService: UserDataService,
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      this._getUserData(this.userDataService.listUsers()),
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  displayAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(
        tap((addedAUser) => {
          if (addedAUser) {
            const updatedUsers = this.userDataService.listUsers();
            this._updateDataSource(this._getUserData(updatedUsers));
          }
        }),
        take(1),
      )
      .subscribe();
  }

  private _updateUser(userToUpdate: User): void {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      data: {
        userToUpdate,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap((updatedUser) => {
          if (updatedUser) {
            this._updateDataSource(
              this.dataSource.data.map((user) => {
                return user.idNumber === updatedUser.idNumber
                  ? this._buildUserData(updatedUser)
                  : user;
              }),
            );
          }
        }),
        take(1),
      )
      .subscribe();
  }

  private _deleteUser(userToDelete: User): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        userToDelete,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap((wasConfirmedToDelete) => {
          if (wasConfirmedToDelete) {
            const idToDelete = userToDelete.idNumber;
            this.userDataService.deleteUser(idToDelete);

            const updatedDataSource = this.dataSource.data.filter(
              (user) => user.idNumber !== idToDelete,
            );

            this._updateDataSource(updatedDataSource);
          }
        }),
        take(1),
      )
      .subscribe();
  }

  private _getUserData(users: User[]): UserData[] {
    return users.map((user) => this._buildUserData(user));
  }

  private _buildUserData(user: User): UserData {
    const { idNumber, firstName, lastName } = user;
    return {
      idNumber,
      firstName,
      lastName,
      actions: [
        {
          icon: 'create',
          ariaLabel: 'pencil icon',
          label: 'Update',
          onClick: () => this._updateUser(user),
        },
        {
          icon: 'delete',
          ariaLabel: 'trash icon',
          label: 'Delete',
          onClick: () => this._deleteUser(user),
        },
      ],
    };
  }

  private _updateDataSource(updatedUsers: UserData[]): void {
    this.dataSource.data = [...updatedUsers];
  }
}
