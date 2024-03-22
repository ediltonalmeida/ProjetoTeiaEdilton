import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogJson } from '../tabela-dados-tabela/tabela-dados-tabela.component';
import { TeiaJsonModel } from '../shared/models/services/teia-json.model';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.component.html',
  styleUrls: ['./detalhar.component.scss']
})
export class DetalharComponent implements OnInit {

  itemSelecionado: TeiaJsonModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogJson,
    private dialogRef: MatDialogRef<DetalharComponent>,
  ) { }

  ngOnInit(): void {
    this.itemSelecionado = this.data.dados;
  }

  voltar(){
    this.dialogRef.close();
  }

}
