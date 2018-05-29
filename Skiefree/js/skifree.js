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
   const PROB_OBSTACULOS = 2;
   var FPS = 70;
   var vidas = 3;
   var escapeMonstro = 0;
   var monstroVisivelLoop = 0;
   var contMonstroVisivelLoop = 0;

   var d = document.getElementById("metros");
   d.innerHTML = 0;
   d.vlrNumerico = 0;

/*-------- Variaveis de controle de Loop --------*/
   var gameLoop;
   var metrosLoop;
   var animLoop;
/*-----------------------------------------------*/
   var montanha;
   var skier;
   var direcoes = ['para-esquerda','para-frente','para-direita'];
   
   var abominavelMonstroDasNeves; 
   var amdnDirecoes = ['amdn-anim-correr-esquerda','amdn-anim-frente', 'amdn-anim-correr-direita'];

   var tiposObstaculos = ['cogomelo', 'anim-arbusto-em-chamas', 'rocha', 'toco-de-arvore', 'arvore', 'arvore-grande', 'cachorro'];
   var obstaculosNoJogo = [];

   function init () {
      montanha = new Montanha();
      skier = new Skier();
      abominavelMonstroDasNeves = new AbominavelMonstroDasNeves();
      document.getElementById("vidas").innerHTML = skier.vidas;
      gameLoop = setInterval(run, 1000/FPS);
      metrosLoop = setInterval(metros, 1000);
      monstroVisivelLoop = setInterval(monstroTimerVisivel, 1000);
   }

   function controles(e) {
      if (e.key == 'a') { 
         skier.mudarDirecao(-1);
      }
      else if (e.key == 'd') { 
         skier.mudarDirecao(1);
      }
   }

   function acelerar(e) { 
      if(e.key == 'f') {
         clearInterval(gameLoop);
         if(FPS == 70) {
            FPS = 200;
            gameLoop = setInterval(run, 1000/FPS);
            skier.element.style.top = "130px";
            escapeMonstro = 1;
         }
         else { 
            FPS = 70;
            gameLoop = setInterval(run, 1000/FPS);
            skier.element.style.top = "100px";
            escapeMonstro = 0;
         }
      }

   }

   /*Adiciona um ouvinte(handle listener) de eventos do tipo keydown() ao objeto window
    *Ou seja, independentemente de qualquer coisa, ao abrir a janela e as teclas especificadas
    forem clicadas, os eventos serão capturados*/
   window.addEventListener('keydown', controles);
   window.addEventListener('keydown', acelerar);


   /*Incremeta a quantidade de metros em 20 caso o FPS == 70, caso contrário incrementa em 30*/
   function metros() {
   // acumula a quantidade de metros internamente no JavaScript. 
      if(FPS == 70)
         d.vlrNumerico += 20;
      else 
         d.vlrNumerico += 30;
      d.innerHTML = d.vlrNumerico;
   }

   function monstroTimerVisivel() { 
      console.log(contMonstroVisivelLoop);
      if(abominavelMonstroDasNeves.visivel == 1)  { 
         if(contMonstroVisivelLoop < 15)
            contMonstroVisivelLoop += 1;
         else  
            abominavelMonstroDasNeves.desaparecer();
            console.log("visivel: " + abominavelMonstroDasNeves.visivel)

      }

   }

   function outArea(e, a) {
      var posLeft = parseInt(e.element.style.left);
      if( posLeft > TAMX-20) { 
         e.element.style.left = TAMX-20 + 'px';
         a.element.style.left = TAMX-20 + 'px';
      }
      else if(posLeft < 5) { 
         e.element.style.left = 5 + 'px';
         a.element.style.left = 5 + 'px';
      }
   }

   function gameOver() { 
      clearInterval(metrosLoop);
      clearInterval(gameLoop);
      clearInterval(monstroVisivelLoop);
      window.removeEventListener('keydown', controles);
      window.removeEventListener('keydown', acelerar);
      window.alert("GAMEOVER");
   }


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
      this.element.style.top = '100px'; //Posição top do skier na montanha
      this.element.style.left = parseInt(TAMX/2)-7 + 'px'; //Posição left do skier na montanha
      /*Essa função é acionada quando o ouvinte de eventos captura o evento keydown 'a' ou 'd'
       *Sua lógica basicamente consisite em trocar as classes(para-esquerda, para-frente e para-direita)
        Css que 'fazem' as direções*/
      this.mudarDirecao = function (giro) {
         if (this.direcao + giro >=0 && this.direcao + giro <=2) {
            this.direcao += giro;
            this.element.className = direcoes[this.direcao];
            abominavelMonstroDasNeves.mudarDirecao(giro);  
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
               return false;
            }
            else { 
               this.element.className = "skier-caido-morto";
               console.log("O jogo acabou :(");
               return true;
            }
      }
      
      this.pegarCogomelo = function() { 
         if(this.vidas < 3) { 
            this.vidas++;
            document.getElementById("vidas").innerHTML = this.vidas;
         }
      }

   }


   function AbominavelMonstroDasNeves() { 
      this.direcao = 1; //0-esquerda;1-frente;2-direita
      this.visivel = 0;
      this.element = document.getElementById("abominavel-monstro-das-neves");
      this.element.style.display = "none";      
      this.element.className = amdnDirecoes[this.direcao];
      this.element.style.top = '-5px'; //Posição top inicial do abomina na montanha
      
      this.mudarDirecao = function(giro) {
         if(this.direcao + giro >=0 && this.direcao + giro <=2) { 
            this.direcao += giro;
            this.element.className = amdnDirecoes[this.direcao];
         } 

      }
   
      this.andar = function (escape) { 
         if (this.direcao == 0) {
            this.element.style.left = (parseInt(this.element.style.left)-1) + "px";
         }
         if (this.direcao == 2) {
            this.element.style.left = (parseInt(this.element.style.left)+1) + "px";
         }         
         if(escape == 0)
            this.element.style.top = (parseFloat(this.element.style.top)+0.3) + "px";
      }

      this.aparecer = function() { 
         this.element.style.left = skier.element.style.left; //Posicionando left o amdn de acordo com a posição do skier 
         this.element.style.top = '-5px'; //Posição top inicial do abomina na montanha
         this.element.style.display = "initial";
         this.visivel = 1;      
      }

      this.desaparecer = function() {
         this.element.style.display = "none";
         this.visivel = 0;
         console.log("debug desparecer: " + this.visivel);
         contMonstroVisivelLoop = 0;
      }

      this.comeu = function(esquiador) { 
         monstroPosTop = parseFloat(this.element.style.top);
         monstroPosLeft = parseInt(this.element.style.left);
         esquiadorPosTop = parseInt(esquiador.element.style.top);
         esquiadorPosLeft = parseInt(esquiador.element.style.left); 

         if(Math.abs(monstroPosTop-esquiadorPosTop) <= 10 && Math.abs(monstroPosLeft-esquiadorPosLeft) <=10) { 
            skier.element.className = "none";
            abominavelMonstroDasNeves.element.className = "amdn-anim-gameover-noLoop";
            skier.vidas = 0;
            document.getElementById("vidas").innerHTML = skier.vidas;
            return true;
         }
         else
            return false;
         
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
      if (random <= PROB_OBSTACULOS*10) {
         var obs = new Obstaculo();
         obstaculosNoJogo.push(obs);
//       console.log(obstaculosNoJogo.length);
      }

      obstaculosNoJogo.forEach(function (o) {
        var top = (parseInt(o.element.style.top)-1);
         o.element.style.top = top + "px";
      });

      skier.andar();
      outArea(skier, abominavelMonstroDasNeves);

      if(d.vlrNumerico > 0 && d.vlrNumerico % 200 == 0) { //torna visivel o abominavel monstro das neves
         abominavelMonstroDasNeves.aparecer();
      }

      if(abominavelMonstroDasNeves.visivel == 1) { //O monstro  ira agir enqanto visivel por x tempo. 
         abominavelMonstroDasNeves.andar(escapeMonstro); //tenta matar o skier
         if(abominavelMonstroDasNeves.comeu(skier))  
            gameOver();       
      }

      //Este trecho de código trata das colisoes e da redução de vidas
      obstaculosNoJogo.forEach(function(o) {
         var skierPosLeft = parseInt(skier.element.style.left);
         var obsPosLeft = parseInt(o.element.style.left); 
         
         if(skier.element.style.top == o.element.style.top && Math.abs(skierPosLeft-obsPosLeft) <= 10) {
            if(o.flag != 0){ 
               if(skier.cair())
                  gameOver();
//               console.log("\nskier: " + skier.element.style.top + " obstaculo: " + o.element.style.top);
//               console.log("\nskier: " + skierPosLeft + " obstaculo: " + obsPosLeft + " Sub: " + (skierPosLeft-obsPosLeft));
            }
            else
               skier.pegarCogomelo();
         }
      });
   }




   init();

})();