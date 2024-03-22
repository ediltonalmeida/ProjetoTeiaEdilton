import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TeiaJsonModel } from '../shared/models/services/teia-json.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TeiaService } from '../shared/models/services/teia-service';
import { MessageService } from 'src/app/core/messaging/message.service';
import { MatDialog } from '@angular/material/dialog';
import { DetalharComponent } from '../detalhar/detalhar.component';

export interface DialogJson {
  dados: TeiaJsonModel;
}

@Component({
  selector: 'app-tabela-dados-tabela',
  templateUrl: './tabela-dados-tabela.component.html',
  styleUrls: ['./tabela-dados-tabela.component.scss']
})
export class TabelaDadosTabelaComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<TeiaJsonModel>;
  displayedColumns: string[] = ['albumId','id','title','thumbnailUrl'];
  principal = true;
  barra = false;
  corbarra = '#005BA8';
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator') set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private teiaService: TeiaService,
    private messageService: MessageService,
    public dialog: MatDialog,
  ) { }
  
  ngOnInit(): void {
    this.carregarJsonTeia();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  carregarJsonTeia(){
    this.principal = false;
    this.barra = true;
    this.teiaService.carregarJsonTeia().subscribe(
      resp =>{this.dataSource = new MatTableDataSource(resp),this.dataSource.paginator = this.paginator},
      () => {this.messageService.error("Erro ao Listar Tabela do Json")},
      () => {this.barra = false; this.principal = true}
    );
  }

  openDialog(item : TeiaJsonModel) {
    this.dialog.open(
      DetalharComponent,
            {
                data:{dados : item},
                maxWidth: '85vw',
                maxHeight: '85vh',
                height: '85%',
                width: '85%',
                panelClass: 'full-screen-modal',
                disableClose: false,
            }
          );
  }

}
