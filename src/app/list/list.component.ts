import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CardComponent, CdkDropList, CdkDrag], // Import CDK modules
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() list: any;
  @Output() deleteListEvent = new EventEmitter<void>();

  addCard(): void {
    const cardHeader = prompt('Enter card title:');
    const cardDesc = prompt('Enter card description:');
    if (cardHeader) {
      this.list.cards.push({ header: cardHeader, desc: cardDesc, time: new Date().toLocaleString() });
      this.sortCards(); // Sort cards after adding a new one
    }
  }

  onDeleteCard(index: number): void {
    this.list.cards.splice(index, 1);
  }

  deleteList(): void {
    this.deleteListEvent.emit();
  }

  // Handle card drop event
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list.cards, event.previousIndex, event.currentIndex);
    this.sortCards(); // Sort cards after dropping
  }

  // Sort cards in reverse chronological order
  sortCards(): void {
    this.list.cards.sort((a: any, b: any) => {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
  }
}