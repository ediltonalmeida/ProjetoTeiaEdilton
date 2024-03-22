import { Component, OnInit, ViewChild } from '@angular/core';
import { TeiaService } from '../shared/models/services/teia-service';
import { TeiaJsonModel } from '../shared/models/services/teia-json.model';
import { MessageService } from 'src/app/core/messaging/message.service';
import { MatPaginator } from '@angular/material/paginator';
import { DetalharComponent } from '../detalhar/detalhar.component';
import { MatDialog } from '@angular/material/dialog';

export interface ClassificarAlbums {
  value: any;
  viewValue: string;
  icon: any;
}

@Component({
  selector: 'app-tabela-dados',
  templateUrl: './tabela-dados.component.html',
  styleUrls: ['./tabela-dados.component.scss']
})
export class TabelaDadosComponent implements OnInit {

  principal = true;
  barra = false;
  corbarra = '#005BA8';
  albumsCompleto: TeiaJsonModel[];
  albums: TeiaJsonModel[];
  filtrarPorAlbum: any;
  filtarNumero: any;
  filtrarPorTitulo: any;
  listaAlbums: number[] = [];
  length=5000;
  pageIndex=0;
  pageSize=8;
  iconDes = '';
  iconAsc = 'arrow_upward'
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator

  classificarAlbum: ClassificarAlbums[] = [
    {value: 'albumId', icon: 'arrow_upward', viewValue: 'Album'},
    {value: 'albumId', icon: 'arrow_downward', viewValue: 'Album'},
    {value: 'id', icon: 'arrow_upward', viewValue: 'Id'},
    {value: 'id', icon: 'arrow_downward', viewValue: 'Id'},
    {value: 'title', icon: 'arrow_upward', viewValue: 'Título'},
    {value: 'title', icon: 'arrow_downward', viewValue: 'Título'},
    {value: 'url', icon: 'arrow_upward', viewValue: 'URL'},
    {value: 'url', icon: 'arrow_downward', viewValue: 'URL'},

  ];

  constructor(
    private teiaService: TeiaService,
    private messageService: MessageService,
    public dialog: MatDialog,
  ) { 
    this.listaAlbums = Array.from({length:100}, (_, index) => index +1);
  }

  
  ngOnInit(): void {
    this.carregarJsonTeia();
  }

  carregarJsonTeia(){
    this.principal = false;
    this.barra = true;
    this.teiaService.carregarJsonTeia()
    .subscribe(
      resp => {this.albums = (resp)},
        () => {this.messageService.error('Falha ao carregar Json')},
        () => {this.albumsCompleto = this.albums, this.barra = false; this.principal = true}  
    );
  }

  changePage(event){
    this.length = this.albums.length;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    //this.albums = this.albums.slice(startIndex, endIndex);
  }

  filtrarAlbum(album: number): void {
    console.log(album)
    this.filtrarPorAlbum = album;
    this.aplicarFiltros();
  }

  filtrarNumber(numero: number): void {
    this.filtarNumero = numero;
    this.aplicarFiltros();
  }

  filtrarTitulo(titulo: string): void {
    this.filtrarPorTitulo = titulo;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.albums = this.albumsCompleto.filter(item => {
      const AlbumMatch = this.filtrarPorAlbum ? item.albumId === this.filtrarPorAlbum : true;
      const NumeroMatch = this.filtarNumero ? item.id.toString().toLowerCase().includes(this.filtarNumero.toLowerCase()) : true;
      const TituloMatch = this.filtrarPorTitulo ? item.title.toLowerCase().includes(this.filtrarPorTitulo.toLowerCase()) : true;
      return AlbumMatch && NumeroMatch && TituloMatch 
    },
    );
    this.paginacaoPosFiltro();
  }

  paginacaoPosFiltro(){
    this.length = this.albums.length;
    this.pageIndex=0;
    this.pageSize=8;
    this.length = this.albums.length;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
  }

  classificar(coluna : string, icon: string){
    console.log(icon)
      this.albums = this.albums.slice().sort((a, b) => {
        if (typeof a[coluna] === 'string' || typeof b[coluna] === 'string') { 
          const comparison =  a[coluna].localeCompare(b[coluna]);
          return icon === 'arrow_upward' ?comparison :-comparison
        }
          const comparison = a[coluna] - b[coluna];
          return icon === 'arrow_upward' ?comparison :-comparison
      });
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
