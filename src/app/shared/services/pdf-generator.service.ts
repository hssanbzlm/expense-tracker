import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  private cashHistory: Array<any[]>;
  private doc: jsPDF;
  constructor(private authService: AuthService) {}

  print(pdfTemplate: HTMLCollectionOf<Element>) {
    this.getCashHistory(pdfTemplate);
    this.setUpDoc();
    autoTable(this.doc, {
      head: [['Amount', 'Remark', 'Date', 'Balance']],
      body: this.cashHistory,
      startY: 35,
    });
    this.doc.save('cash book');
  }

  getCashHistory(pdfTemplate: HTMLCollectionOf<Element>) {
    this.cashHistory = [];
    for (let i = 0; i < pdfTemplate.length; i++) {
      const cashContent = [];
      let signAmount =
        pdfTemplate
          .item(i)
          .getElementsByTagName('p')
          .item(0)
          .className.split(' ')[2] == 'cash-in'
          ? ''
          : '-';
      cashContent[0] =
        signAmount + pdfTemplate.item(i).getElementsByTagName('p')[0].innerText; //amount
      cashContent[1] = pdfTemplate
        .item(i)
        .getElementsByTagName('p')[1].innerText; //remark
      cashContent[2] = pdfTemplate
        .item(i)
        .getElementsByTagName('p')[2].innerText; //date
      cashContent[3] = pdfTemplate
        .item(i)
        .getElementsByTagName('p')[3].innerText; //balance
      this.cashHistory.push(cashContent); // autotable body accepts array of arrays data
    }
  }

  setUpDoc() {
    this.doc = new jsPDF();
    let date = Date.now();
    let currentDate = new Date(date);
    this.doc.text('Cash book history', 80, 10);
    this.doc.setFontSize(10);
    this.doc.text(`${currentDate}`, 10, 20);
    this.doc.text(`Name: ${localStorage.getItem('expenses-uname')}`, 10, 25);
    this.doc.text(
      `Last name: ${localStorage.getItem('expenses-ulname')}`,
      10,
      30
    );
    this.doc.setProperties({
      title: `cash book history of ${localStorage.getItem(
        'expenses-uname'
      )} ${localStorage.getItem('expenses-ulname')}`,
    });
  }
}
