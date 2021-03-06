import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Observable<string[]>;
  currentDoc: string;
  private _docSub: Subscription;

  dataGame: Observable<string[]>;


  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.documentService.documents;

    this.dataGame = this.documentService.gameData;
    this._docSub = this.documentService.currentDocument.subscribe(
      doc => {
        this.currentDoc = doc.id
      }
    );

  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  joinRoom(){
    this.documentService.joinRoom()
  }
  

  loadDoc(id: string) {
    this.documentService.getDocument(id);
  }

  newDoc() {
    this.documentService.newDocument();
  }
}