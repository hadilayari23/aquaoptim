import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../services/devices.service';
import { Device } from '../interfaces/Device';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  onoff: string = '01';
  devices: Device[] = [];
  showModal = false;
  selectedDeviceId: string | null = null;
  deviceform: FormGroup;
  modalTitle: string = 'Add Device';
  buttonLabel: string = 'Add Device';

  constructor(private devicesService: DevicesService) {
    this.deviceform = new FormGroup({
      name: new FormControl('', [Validators.required]),
      deveui: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getDevices();
  }

  toggleIcon(): void {
    this.onoff = this.onoff === '01' ? '00' : '01';
  }

  getDevices(): void {
    this.devicesService.getdevices().subscribe(
      (devices) => {
        console.log('List of devices:', devices.data);
        this.devices = devices.data;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  handleError(error: any): void {
    console.error('Error fetching devices:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error fetching devices!'
    });
  }

  toggleModal(deviceId: string | null = null): void {
    this.selectedDeviceId = deviceId;
    this.showModal = !this.showModal;

    if (deviceId) {
      // Pré-remplir le formulaire avec les données du device pour la mise à jour
      const device = this.devices.find(d => d._id === deviceId);
      if (device) {
        this.deviceform.setValue({
          name: device.name,
          deveui: device.deveui,
          type: device.type
        });
      }
      this.modalTitle = 'Update Device';
      this.buttonLabel = 'Update Device';
    } else {
      // Réinitialiser le formulaire pour la création
      this.deviceform.reset();
      this.modalTitle = 'Add Device';
      this.buttonLabel = 'Add Device';
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  onSubmit(): void {
    if (this.deviceform.valid) {
      const { name, deveui, type } = this.deviceform.value;
      if (this.selectedDeviceId) {
        // Mise à jour de l'appareil
        this.devicesService.updateDevice(this.selectedDeviceId, name, deveui, type).subscribe(
          response => {
            console.log('Response received:', response);
            this.getDevices();
            this.deviceform.reset();
            this.closeModal();
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Device updated successfully!'
            });
          },
          error => {
            console.error('Error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error updating device!'
            });
          }
        );
      } else {
        // Création d'un nouvel appareil
        this.devicesService.adddevices(name, deveui, type).subscribe(
          response => {
            console.log('Response received:', response);
            this.getDevices();
            this.deviceform.reset();
            this.closeModal();
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Device added successfully!'
            });
          },
          error => {
            console.error('Error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error adding device!'
            });
          }
        );
      }
    }
  }

  deleteDevice(iddev: string): void {
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
        this.devicesService.deleteDevice(iddev).subscribe({
          next: response => {
            console.log('Device deleted successfully:', response);
            this.getDevices();
            Swal.fire(
              'Deleted!',
              'Your device has been deleted.',
              'success'
            );
          },
          error: error => {
            console.error('Error deleting device:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error deleting device!'
            });
          }
        });
      }
    });
  }
}
