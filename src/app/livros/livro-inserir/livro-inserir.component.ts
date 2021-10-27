import { Component, EventEmitter, Output } from '@angular/core'
import { NgForm } from '@angular/forms';
import { LivroService } from '../livro.service';
//inserir e lista recebem o metodo constructor
@Component({
  selector:'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css'],
})

export class LivroInserirComponent{
  constructor(public livroService: LivroService){}
 

  onCadastrarLivro(form: NgForm){ //uma forma de testar se o botão funciona
    if(form.invalid){
      return;
    }
    
    this.livroService.cadastrarLivro(
      form.value.id,
      form.value.titulo,
      form.value.autor,
      form.value.paginas
    );    
    form.resetForm();
  }
}
