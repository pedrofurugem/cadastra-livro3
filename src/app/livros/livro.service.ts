//cabe ao serviço fazer a adição de livros
//Um serviço pode ser implementado como uma classe Typescript
import { Livro } from './livro.model';
import { Injectable } from '@angular/core';
//Para que a lista de livros seja obtida a partir de um servidor remoto
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

    @Injectable ({ 
        providedIn: 'root'
    })
    export class LivroService {
        private livros: Livro[] = [];
        private listaLivrosAtualizada = new Subject<Livro[]>();
        
        constructor (private httpBook: HttpClient ){

        }

        
        getLivros(): void {
            this.httpBook.get <{mensagem: string, livros:
            Livro[] }>('http://localhost:3003/api/livros').subscribe(
            (dados) => {
             this.livros = dados.livros;
             this.listaLivrosAtualizada.next([...this.livros]);
            }
          )
        }
    // Também cabe ao serviço fazer a adição de livros
        cadastrarLivro(id:number, titulo: string, 
        autor:string, paginas:number ){
        const livro: Livro = {
            id: id,
            titulo: titulo,
            autor: autor,
            paginas: paginas,
            };
            this.httpBook.post<{mensagem: string}> ('http://localhost:3003/api/livros', 
            livro).subscribe(
            (dados) => {
                console.log(dados.mensagem);
                this.livros.push(livro);
                this.listaLivrosAtualizada.next([...this.livros]);
            }
         )
        }
        //Para permitir que componentes registrem observadores vinculados à lista atualizada do serviço,
        //vamos definir um novo método que devolve um Observable
        getListaDeLivrosAtualizadaObservable(){
        return this.listaLivrosAtualizada.asObservable();
        }
    }