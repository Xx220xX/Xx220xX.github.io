let other = null;

function drawOptions(x,y,x2,y2,titulo,
                      n_options,
                      textos/*para cada opcao*/,
                      action_begin,
                      action_finish,
                      texto_botao,action_submit, back){
  if(other){
    other.remove();
  }
  if(action_begin){
      action_begin();
  }
  let a = {
    title: createElement('h3', titulo),
    opt:[],
    len:n_options,
    button:createButton(texto_botao),
    back:createButton('voltar'),
    show:null,
    janela:createElement('h4',''),
    forceBack:()=>{a.remove();back();},
    remove:null,
  };
  a.title.position(x,y);
  for(let i=0;i<a.len;i++){
    a.opt[i]={
      texto: createElement('h3', textos[i]),
      inp :  createInput(),
    } ;
  }
   y = y + a.title.height+4;
  
  for(let i=0;i<a.len;i++){
    a.opt[i].inp.position(x,y+y2);
    a.opt[i].texto.position(x+ a.opt[i].inp.width+3,y);
    y = y +  a.opt[i].texto.height+2;
  }
  let conner_option = 0;
  if(a.len>0){
      conner_option =  a.opt[0].inp.width;
  }
  a.button.position(x,y+y2);
  a.back.position( x+conner_option-a.back.width,y+y2);
  a.janela.position( x+x2,y+y2+  a.back.height);
  a.back.mousePressed(()=>{a.remove();back();});
  a.button.mousePressed(()=>{
    let lt = [];
    for(let i=0;i<a.len;i++){
      lt[i] =a.opt[i].inp.value();
    }
    action_submit(a,lt);
  });
  a.remove = function(){
    for(let i=0;i<a.len;i++){
       a.opt[i].texto.remove();
       a.opt[i].inp.remove();
    } 
    a.title.remove();
    a.janela.remove();
    a.button.remove();
    a.back.remove();
    other = null;
  };
  a.show= function(txt){
       a.janela.html(txt);
  };
  other = a;
  if(action_finish){
    action_finish(a);
  }
}

function apagar(fasor){
  let dr =fasor.draw;
  let opt = [];
  for (let i = 0;i<fasor.arr.length;i++){
    opt[i] = createCheckbox(fasor.arr[i].name, false);    
  }
  fasor.draw = function(){
  
  };
  
}
function AddFasor(fasor){
  drawOptions(25,80,40,20,'Adicionando Fasores',3,
  ['Nome','Modulo','Fase',],
  ()=>{push();},()=>{pop();},
  'Adicionar',(a,lt)=>{
    fasor.add(lt[0],float(lt[1]),float(lt[2]));
  });
}
