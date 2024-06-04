import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideservicesService {

  constructor() { }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch (e) {
      console.warn(`Value for key "${key}" is not valid JSON, returning as string.`);
      return item;
    }
  }}