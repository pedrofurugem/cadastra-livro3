import { Component, OnInit, OnDestroy } from '@angular/core';
import { Livro } from '../livro.model';
//A injeção de dependências sempreocorre no construtor do componente
import { LivroService } from '../livro.service';
import { Subscription, Observable} from 'rxjs';

//inserir e lista recebem o metodo construtor
@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  livros: Livro[] = [];
  private livrosSubscription: Subscription

  constructor(public livroService: LivroService ) {} //aqui precisa de provedor de serviço
   
  ngOnInit(): void {
    this.livroService.getLivros();
    this.livrosSubscription = this.livroService
    .getListaDeLivrosAtualizadaObservable()
    .subscribe((livros: Livro[]) => {
      this.livros = livros;
    })
  }

  ngOnDestroy(): void {
    this.livrosSubscription.unsubscribe();
  }

}



//Feita a injeção de dependência, o componente já pode utilizar a lista que o serviço oferece. Para
//isso, usaremos o método ngOnInit da interface OnInit que precisa ser implementada pela
//classe. Ele executa automaticamente assim que o componente é construído. É recomendável
//utilizá-lo para esse fim e reservar o construtor para as injeções de dependência

