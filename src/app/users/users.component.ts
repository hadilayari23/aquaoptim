import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  showModal = false;
  selecteduserId: string | null = null;
  modalTitle = 'Create New User';
  buttonLabel = 'Create New User';
  userform: FormGroup;

  constructor(private userService: UsersService) {
    this.userform = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ])
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  closeModal(): void {
    this.showModal = false;
  }

  toggleModal(userId: string | null = null): void {
    this.selecteduserId = userId;
    this.showModal = !this.showModal;

    if (userId) {
      const user = this.users.find(u => u._id === userId);
      if (user) {
        this.userform.setValue({
          name: user.name,
          lastname: user.lastname,
          email: user.email
        });
      }
      this.modalTitle = 'Update User';
      this.buttonLabel = 'Update User';
    } else {
      this.userform.reset();
      this.modalTitle = 'Create New User';
      this.buttonLabel = 'Add User';
    }
  }

  getUsers(): void {
    this.userService.getuser().subscribe(
      (response) => {
        console.log('List of users:', response.data);
        this.users = response.data;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  handleError(error: any): void {
    console.error('Error fetching users:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error fetching users!'
    });
  }

  onSubmit(): void {
    if (this.userform.valid) {
      const { name, lastname, email } = this.userform.value;
      if (this.selecteduserId) {
        // Update user
        this.userService.updateuser(this.selecteduserId, name, lastname, email).subscribe(
          response => {
            console.log('Response received:', response);
            this.getUsers();
            this.userform.reset();
            this.closeModal();
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'User updated successfully!'
            });
          },
          error => {
            console.error('Error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error updating user!'
            });
          }
        );
      } else {
        // Create new user
        this.userService.createuser(name, lastname, email).subscribe(
          () => {
            console.log('User added successfully!');
            this.getUsers();
            this.userform.reset(); // Reset the form after successful addition
            this.closeModal();
            Swal.fire({ // Show a success notification
              icon: 'success',
              title: 'Success',
              text: 'User added successfully!'
            });
          },
          (error) => {
            console.error('Error adding user:', error);
            Swal.fire({ // Show an error notification
              icon: 'error',
              title: 'Oops...',
              text: 'Error adding user!'
            });
          }
        );
      }
    }
  }

 async deleteuser(iduser: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#008080',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
       this.userService.deleteuser(iduser).subscribe({
          next: response => {
            console.log('User deleted successfully:', response);
            this.getUsers();
            Swal.fire(
              'Deleted!',
              'Your user has been deleted.',
              'success'
            );
          },
          error: error => {
            console.error('Error deleting user:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error deleting user!'
            });
          }
        });
      }
    });
  }
}
