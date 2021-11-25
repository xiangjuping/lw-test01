import { Component, OnInit } from '@angular/core';

import { File } from '../file';
import { FileService } from '../file.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  files: File[] = [];

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.getFiles();
  }

  // 获取文件信息
  getFiles(): void {
    this.fileService.getFiles()
    .subscribe(files => this.files = files);
  }

  // 添加上传文件
  add(name): void {
    name = name.trim().substr(12);
    console.log(name);
    if (!name) { 
      return; 
    }
    this.fileService.addFile({ name } as File)
      .subscribe(file => {
        console.log(file);
        this.files.push(file);
      });
  }

  // 删除文件
  delete(file: File,i:number): void {
    this.files.splice(i,1)
    // this.files = this.files.filter(h => h !== file);
    // this.fileService.deleteFile(file.id).subscribe();
  }

  // 修改文件名
  doChange(e,i:number){
    console.log(e);
    console.log();
    console.log(this.files[i].name);
    this.files[i].name = e
  }

}
