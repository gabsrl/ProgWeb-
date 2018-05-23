/*Utiliza o constructor pattern(CP) que encapsula (em funções) construtores, o código para a criação
 dos objetos. Construtores são funções. São destinguidas de outras funções pois iniciam com letra maiúsculas.

 *Como em JS até funções são objetos e como está sendo usado o CP, diferente objetos 
 instanciados com um construtor terão referências para diferentes objetos dessa função. 
 Ou seja, vários objetos que representam uma função que faz algo igual para todos.

 *Definir seus próprios construtores garante que as instâncias(objetos) criadas possam ser identificadas
 como sendo de um determinado tipo, posteriormente.

   */

(function () {

   const TAMX = 300;
   const TAMY = 400;
   const PROB_ARVORE = 2;
   var FPS = 70;
   var quantidadeMetros = 0;
   var vidas = 3;
   var gameLoop;
   var montanha;
   var skier;
   var direcoes = ['para-esquerda','para-frente','para-direita']
   var tiposObstaculos = ['cogomelo', 'arbusto-em-chamas', 'rocha', 'toco-de-arvore', 'arvore', 'arvore-grande', 'cachorro'];
   var obstaculosNoJogo = [];

   function init () {
      montanha = new Montanha();
      skier = new Skier();
      document.getElementById("vidas").innerHTML = skier.vidas;
      gameLoop = setInterval(run, 1000/FPS);
      metrosLoop = setInterval(metros, 1000);
   }

   /*Adiciona um ouvinte(handle listener) de eventos do tipo keydown() ao objeto window
    *Ou seja, independentemente de qualquer coisa, ao abrir a janela e as teclas especificadas
    forem clicadas, os eventos serão capturados*/
   window.addEventListener('keydown', function (e) {
      if (e.key == 'a') skier.mudarDirecao(-1);
      else if (e.key == 'd') skier.mudarDirecao(1);
   });

   window.addEventListener('keydown', function(e) { 
      if(e.key == 'f') {
         clearInterval(gameLoop);
         if(FPS == 70) {
            FPS = 200;
            gameLoop = setInterval(run, 1000/FPS);
            skier.element.style.top = "80px";
         }
         else { 
            FPS = 70;
            gameLoop = setInterval(run, 1000/FPS);
            skier.element.style.top = "40px";
         }
      }

   });

   function Montanha () {
      this.element = document.getElementById("montanha");
      this.element.style.width = TAMX + "px";
      this.element.style.height = TAMY + "px";
   }

   function Skier() {

      this.element = document.getElementById("skier");
      this.direcao = 1; //0-esquerda;1-frente;2-direita
      this.vidas = 3;
      this.element.className = 'para-frente';
      this.element.style.top = '30px'; //Posição top do skier na montanha
      this.element.style.left = parseInt(TAMX/2)-7 + 'px'; //Posição left do skier na montanha

      /*Essa função é acionada quando o ouvinte de eventos captura o evento keydown 'a' ou 'd'
       *Sua lógica basicamente consisite em trocar as classes(para-esquerda, para-frente e para-direita)
        Css que 'fazem' as direções*/
      this.mudarDirecao = function (giro) {
         if (this.direcao + giro >=0 && this.direcao + giro <=2) {
            this.direcao += giro;
            this.element.className = direcoes[this.direcao];
         }
      }

      /*Essa função movimenta o Skie, fazendo ele se deslocar em questão de pixels para esquerda e direita,
       ou seja, como um deslocamento sobre o eixo x(-x e x+)

       *A função faz um deslocamento unitário(de 1 pixel) somente. O que faz a animação acontecer
       (deslocamento de vários pixels) do skier, é a função run que fica sendo chamada "continuamente", assim
       se um evento ('keydown') mudou a direção do skier(para esquerda ou direita), a função andar realiza o
       deslocamento de 1 pixel.*/
      this.andar = function () { 
         if (this.direcao == 0) {
            this.element.style.left = (parseInt(this.element.style.left)-1) + "px";
         }
         if (this.direcao == 2) {
            this.element.style.left = (parseInt(this.element.style.left)+1) + "px";
         }         
      }
      
      /*Funcao utilizada quando o skier colide com algum obstaculo. 
       *Ela apresenta a animação do skier caindo e levantando
       *O número de vidas é decrementado e atualizado no painel*/   
      this.cair = function() { 
         this.vidas = this.vidas-1; 
         console.log(this.vidas);
            if(this.vidas >= 0) { 
               this.element.className = "skier-caido";
               document.getElementById("vidas").innerHTML = this.vidas;
            }
            else { 
               this.element.className = "skier-caido-morto";
               console.log("O jogo acabou :(");
               //implementar fim do jogo
            }
      }
      
      this.pegarCogomelo = function() { 
         if(this.vidas < 3) { 
            this.vidas++;
            document.getElementById("vidas").innerHTML = this.vidas;
         }
      }

   }

   function Obstaculo() {
      this.flag = Math.floor(Math.random()*7); //sorteando um obstaculo 
      this.element = document.createElement('div');
      montanha.element.appendChild(this.element);
      this.element.className = tiposObstaculos[this.flag]; //selecionando o obstaculo com a flag
      this.element.style.top = TAMY + "px";
      this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
   }

   function run () {
      var random = Math.floor(Math.random() * 1000);
      if (random <= PROB_ARVORE*10) {
         var obs = new Obstaculo();
         obstaculosNoJogo.push(obs);
      }

      obstaculosNoJogo.forEach(function (o) {
         o.element.style.top = (parseInt(o.element.style.top)-1) + "px";
      });

      skier.andar();

      //Este trecho de código trata das colisoes e da redução de vidas
      obstaculosNoJogo.forEach(function(o) {
         var skierPosLeft = parseInt(skier.element.style.left);
         var obsPosLeft = parseInt(o.element.style.left); 
         if(skier.element.style.top == o.element.style.top && Math.abs(skierPosLeft-obsPosLeft) <= 10) {
            if(o.flag != 0){ 
               skier.cair();
               console.log("\nskier: " + skier.element.style.top + " obstaculo: " + o.element.style.top);
               console.log("\nskier: " + skierPosLeft + " obstaculo: " + obsPosLeft + " Sub: " + (skierPosLeft-obsPosLeft));
            }
            else
               skier.pegarCogomelo();
         }
      });
   }

   /*Incremeta a quantidade de metros em 20 caso o FPS == 70, caso contrário incrementa em 30*/
   function metros() {
      var d = document.getElementById("metros"); 
      var c = parseInt(d.innerHTML);
      if(FPS == 70)
         c = c+20;
      else 
         c = c+30;
      d.innerHTML = c;
      quantidadeMetros = quantidadeMetros+c; // acumula a quantidade de metros internamente no JavaScript. 
   }

   function Painel() { 

   }


   init();

})();