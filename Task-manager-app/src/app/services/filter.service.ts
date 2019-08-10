import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { DeadlineService } from './deadline.service';
import { Task, Status, FilterTerms } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  constructor(
    private _storage: StorageService,
    private _deadline: DeadlineService,
  ) {}


  private _filterStatus(srcArray: Task[] ,status: Status){
    return srcArray.filter(task => {
      switch(status){
        case Status.done: return task.isDone;
        case Status.in_progress: return !task.isDone && !this._deadline.isPassed(task.deadline);
        case Status.missed: return !task.isDone && this._deadline.isPassed(task.deadline);
        default: return true;
      }
    })
  }

  private _filterExactDate(srcArray: Task[], exactDate: Date | string){
    if(!exactDate)return srcArray;
    return srcArray.filter(task => this._deadline.isSameDate(task.deadline,exactDate))
  }

  private _filterDateScope(srcArray: Task[], minDate: Date | string, maxDate: Date | string){
    if(!minDate && !maxDate)return srcArray;
    return srcArray.filter(task => this._deadline.isInDateScope(task.deadline,minDate,maxDate))
  }

  private _filterPlace(srcArray: Task[], placeName: string){
    if(!placeName)return srcArray;
    return srcArray.filter(task => task.placeName === placeName);
  }

  private _filterAddress(srcArray: Task[], address: string){
    if(!address)return srcArray;
    return srcArray.filter(task => task.address.includes(address));
  }

  private _search(srcArray: Task[], searchTerm: string){
    if(!searchTerm)return srcArray;
    return srcArray.filter(task => {
      return(
        task.title.toLowerCase().includes(searchTerm) ||
        task.address.toLowerCase().includes(searchTerm) ||
        task.placeName.toLowerCase().includes(searchTerm)
      )
    })
  }

  public globalFilter(fTerms: FilterTerms, sTerm: string): Task[] {

    if(!fTerms && !sTerm)return this._storage.taskList;

    let filtered = this._storage.taskList.slice();

    if(fTerms){
      filtered = this._filterExactDate(filtered,fTerms.exactDate);
      filtered = this._filterDateScope(filtered,fTerms.minDate,fTerms.maxDate);
      filtered = this._filterStatus(filtered,fTerms.status);
      filtered = this._filterPlace(filtered,fTerms.placeName);
      filtered = this._filterAddress(filtered,fTerms.address);
    }

    filtered = this._search(filtered,sTerm)
    
    return filtered

  }

  private _getStandaloneWords(phrases: string[]): string[] {
    let words = [];
    const forbiddenPattern = new RegExp(/\b[^\d\W]+\b/,'g');

    phrases.forEach(phrase => {
      const checkedWords = phrase.split(' ').filter(word => !word.search(forbiddenPattern))
      words = words.concat(checkedWords);
    })
    return words
  }

  private _retrieveCommonWords(srcWords: string[], limit: number): string[] {
    
    const keywords = new Set(srcWords);
    const commonWords = [];

    keywords.forEach(keyword => {
      let matchCount = 0;
      for(let word of srcWords){
        if(word === keyword){
          matchCount++;
          if(matchCount === limit){
            commonWords.push(keyword);
            break;
          }
        }
      }
    })
    return commonWords;
  }

  public generateShorthandAdresses(): string[] {

    const sourceAddresses = this._storage.taskList.map(task => task.address);
    const words = this._getStandaloneWords(sourceAddresses);
    const shorthands = this._retrieveCommonWords(words,3);

    return shorthands;

  }

}