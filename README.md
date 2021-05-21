# ClubHouse Clone - Semana JS Expert 4.0

Este projeto tem como foco e objetivo utilizar tecnologias de comunicação de áudio em tempo real para possibilitar aos usuários entrar e criar conversar sobre diversos tópicos.

A aplicação foi desenvolvida durante a Semana JS Expert 4.0, ministrada pelo grandioso [Erick Wendel](https://github.com/erickwendel)

## Conteúdo

### **App**

A aplicação web/mobile, feita com design mobile first, usando apenas JS puro com a ferramenta de native modules.

No app, o usuário pode fazer login utilizando suas credenciais do **GitHub**, e então acessar o Lobby.

Dentro do Lobby, é possível criar salas de conversa, e visualizar as salas existentes.

Dentro de uma sala, o dono dela pode falar, enquanto os demais participantes podem apenas ouvir. Um participante pode requisitar ao dono da sala permissão para falar, e nesse momento ele se torna também um palestrante.

### **Servidor**

O back-end é um servidor de sockets que utiliza a biblioteca **Socket.IO**. Ele gerencia a conexão dos usuários e garante que as regras de negócio da aplicação estão sendo aplicadas.

O servidor de sockets também gerencia as conexões peer to peer dos usuários, para que o cliente saiba para quem ligar na hora de efetuar as chamadas.

## Considerações

A aplicação é feita com Javascript puro, para não se perder o costume de utilizar a linguagem em sua forma mais natural (vulgo sem Typescript). São utilizados alguns conceitos limpos como separação de responsabilidades, inversão de dependências, e padrões como builder e MVC.