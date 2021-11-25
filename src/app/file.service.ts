import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { File } from './file';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class FileService {

  private filesUrl = 'api/files'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }
  getFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.filesUrl)
      .pipe(
        tap(_ => this.log('fetched files')),
        catchError(this.handleError<File[]>('getFiles', []))
      );
  }

  getFileNo404<Data>(id: number): Observable<File> {
    const url = `${this.filesUrl}/?id=${id}`;
    return this.http.get<File[]>(url)
      .pipe(
        map(files => files[0]), 
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} file id=${id}`);
        }),
        catchError(this.handleError<File>(`getFile id=${id}`))
      );
  }

  getFile(id: number): Observable<File> {
    const url = `${this.filesUrl}/${id}`;
    return this.http.get<File>(url).pipe(
      tap(_ => this.log(`fetched file id=${id}`)),
      catchError(this.handleError<File>(`getFile id=${id}`))
    );
  }

  searchFiles(term: string): Observable<File[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<File[]>(`${this.filesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found files matching "${term}"`) :
        this.log(`no files matching "${term}"`)),
      catchError(this.handleError<File[]>('searchFiles', []))
    );
  }

  addFile(file: File): Observable<File> {
    return this.http.post<File>(this.filesUrl, file, this.httpOptions).pipe(
      tap((newFile: File) => this.log(`added file w/ id=${newFile.id}`)),
      catchError(this.handleError<File>('addFile'))
    );
  }


  deleteFile(id: number): Observable<File> {
    const url = `${this.filesUrl}/${id}`;

    return this.http.delete<File>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted file id=${id}`)),
      catchError(this.handleError<File>('deleteFile'))
    );
  }

  updateFile(file: File): Observable<any> {
    return this.http.put(this.filesUrl, file, this.httpOptions).pipe(
      tap(_ => this.log(`updated file id=${file.id}`)),
      catchError(this.handleError<any>('updateFile'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`FileService: ${message}`);
  }
}
