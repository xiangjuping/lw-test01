import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { File } from './file';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const files = [
      {id:1,name:'图片1.png'},
      {id:2,name:'文件1.text'},
      {id:3,name:'文件2.doc'},
      {id:4,name:'文件3.js'},
      {id:5,name:'123456.excel'},
    ];
    return {files};
  }

 
  genId(files: File[]): number {
    return files.length > 0 ? Math.max(...files.map(file => file.id)) + 1 : 1;
  }
}