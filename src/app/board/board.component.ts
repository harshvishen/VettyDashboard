import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, transferArrayItem, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, ListComponent, CdkDropList, CdkDrag],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  lists: any[] = [];

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  addList(): void {
    const listName = prompt('Enter list name:');
    if (listName) {
      this.lists.push({ id: `list-${this.lists.length}`, name: listName, cards: [] }); // Add unique ID
      this.saveToLocalStorage();
    }
  }

  onDeleteList(index: number): void {
    this.lists.splice(index, 1);
    this.saveToLocalStorage();
  }

  saveToLocalStorage(): void {
    localStorage.setItem('vetty-dashboard', JSON.stringify(this.lists));
  }

  loadFromLocalStorage(): void {
    const data = localStorage.getItem('vetty-dashboard');
    if (data) {
      this.lists = JSON.parse(data);
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.saveToLocalStorage();
  }

  getConnectedLists(): any[] {
    return this.lists.map(list => list.id); // Return list of connected drop lists
  }
}