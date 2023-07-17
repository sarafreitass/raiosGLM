// 引力・斥力モデル

/* O código em questão utiliza um modelo de atração de partículas para criar uma animação visualmente interessante. 
   Nesse modelo, diversas variáveis são utilizadas para controlar o comportamento das partículas e sua interação com o ambiente.
*/

/*A variável `num` define o número total de partículas presentes na simulação. 
  Ela determina o tamanho dos arrays que armazenam informações sobre cada partícula, como suas posições, velocidades e acelerações.
*/

var num = 1000;

/*Os arrays `x`, `y`, `vx`, `vy`, `ax` e `ay` armazenam as informações específicas de cada partícula. 
  Eles representam as posições, velocidades e acelerações nos eixos x e y para cada partícula individualmente. 
  Essas informações são atualizadas a cada iteração da animação
*/ 

var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);

/*As variáveis `x_max`, `x_min`, `y_max` e `y_min` definem os valores mínimos e máximos permitidos para as coordenadas x e y das partículas. 
  Esses valores são usados para mapear as coordenadas do arquivo CSV para as dimensões da tela, permitindo que as partículas 
  se movam dentro de uma faixa específica.
  Por preferências estéticas, esses valores são estáticos, mas se forem levados considerações técnicas eles deveriam corresponder aos limites 
  minimos e máximos das colunas de latidade e longitude do script em phyton, que podem ser captados pela função de metadados presente nesse
*/

var x_max = -38.86;
var x_min = -73.99;
var y_max = 20.29;
var y_min = -28.63;

/*O parâmetro `magnetism` determina a intensidade da força de atração entre as partículas e uma posição alvo. 
  Quanto maior o valor de `magnetism`, mais forte é a atração entre as partículas e a posição alvo.

  A variável `radius` define o raio das partículas desenhadas na tela. Ela influencia o tamanho visual das partículas.

  A variável `gensoku` controla a diminuição da velocidade das partículas ao longo do tempo. 
  Ela afeta a taxa de desaceleração das partículas, contribuindo para um movimento mais suave e gradual.
 */

var magnetism = 10.0; 
var radius = 1 ; 
var gensoku = 0.95; 

let table;


function preload() {
  table = loadTable('GLM/flashs_filtro.csv', 'csv', 'header');
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  noStroke(); 
  fill(0);
  ellipseMode(RADIUS);
  background(0);
  blendMode(ADD);
  for(var i =0; i< num; i++){
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
  }
}

/* 
Mapear touch_x
touch_x = ((csv_value_1 - x_min) / (x_max - x_min)) * (canvas_x_max - canvas_x_min) + canvas_x_min;

Mapear touch_y
touch_y = ((csv_value_0 - y_min) / (y_max - y_min)) * (canvas_y_max - canvas_y_min) + canvas_y_min;
*/


function draw(){
  fill(0,0,0);
  rect(0,0,width,height);
  
	for (let k = 0; k < table.getRowCount(); k++) {
			touch_x = ((int(table.getString(k, 1)) - (x_min))/(x_max - (x_min)))*windowWidth
			touch_y = ((int(table.getString(k, 0)) - (y_min))/(y_max - (y_min)))*windowHeight
			for(var i=0; i<num; i++){
				var distance = dist(touch_x, touch_y, x[i], y[i]); //dist(x1,y1,x2,y2) ２
				
				if(distance > 3){ 
					ax[i] = magnetism * (touch_x - x[i]) / (distance * distance); 
					ay[i] = magnetism * (touch_y - y[i]) / (distance * distance);
				}
				vx[i] += ax[i]; 
				vy[i] += ay[i]; 

				vx[i] = vx[i]*gensoku;
				vy[i] = vy[i]*gensoku;

				x[i] += vx[i]; 
				y[i] += vy[i]; 

				var sokudo = dist(0,0,vx[i],vy[i]); 
				var r = map(sokudo, 0, 5, 0, 255); 
				var g = map(sokudo, 0,5, 64, 255);
				var b = map(sokudo, 0,5, 128, 255);
				fill(r, g, b, 32);
				ellipse(x[i],y[i],radius,radius);
			}
	}
  
}

/*Por meio dessas variáveis, o modelo de atração de partículas define o comportamento das partículas na animação. 
  Elas influenciam as interações entre as partículas e sua atração em relação à posição alvo, bem como a aparência visual das partículas. 
  Através do ajuste dessas variáveis, é possível explorar diferentes comportamentos e criar efeitos visuais interessantes. */
