'use strict'

window.onload = () => {
  menu()
  dataBodies()
}


let dataBodies = () => {

// module aliases
var Engine = Matter.Engine,
     Render = Matter.Render,
     Runner = Matter.Runner,
     Composite = Matter.Composite,
     Composites = Matter.Composites,
     Common = Matter.Common,
     MouseConstraint = Matter.MouseConstraint,
     Mouse = Matter.Mouse,
     World = Matter.World,
     Events = Matter.Events,
     Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();
const app = document.getElementById('app');

// create a renderer
var render = Render.create({
    element: app,
    engine: engine,
    options: {
       width: window.innerWidth,
       height: window.innerHeight,
       wireframes: false,
       background: 'transparent'
     }
});

var mouseConstraint = Matter.MouseConstraint.create(engine, {
    element: render.canvas
});


let arrayBodies;
let newBodies = [];
const xhr = new XMLHttpRequest();

    xhr.open('GET', 'assets/data/bodies.json', false);
    xhr.send();

    if (xhr.status != 200) {
      // обработать ошибку
      alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
      // вывести результат
      const bodies = xhr.responseText;

      // console.log(bodies);

      JSON.parse(bodies, function(key, value) {
        // console.log('key '+key);
        // console.log(value.circleA);
        arrayBodies = value;

        return value;
      });
    }



for (var bodie in arrayBodies) {
  var value = arrayBodies[bodie];

  // console.log(index);
  switch(value.type) {
    case 'circle':  // if (x === 'value1')
      var newBodie = Bodies.circle(value.posX, value.posY, value.size, {
        collisionFilter:{
          mask: 0x0001
        },
        render: {
          fillStyle: value.color
        }
      })
      newBodies.push(newBodie)
      break;

    case 'rectangle':  // if (x === 'value1')
      var newBodie = Bodies.rectangle(value.posX, value.posY, value.width, value.height, {
        collisionFilter:{
          mask: 0x0001
        },
        render: {
          fillStyle: value.color
        }
      })
      newBodies.push(newBodie)
      break;

    case 'trapezoid':  // if (x === 'value1')
      var newBodie = Bodies.trapezoid(value.posX, value.posY, value.width, value.height, value.slope, {
        collisionFilter:{
          mask: 0x0001
        },
        render: {
          fillStyle: value.color
        }
      })
      newBodies.push(newBodie)
      break;

    case 'polygon':  // if (x === 'value1')
      var newBodie = Bodies.polygon(value.posX, value.posY, value.sides, value.size, {
        collisionFilter:{
          mask: 0x0001
        },
        render: {
          fillStyle: value.color
        }
      })
      newBodies.push(newBodie)
      break;

    default:
      console.log('default');
      break;
  }
  // bodie = +code; ..если нам нужно именно число, преобразуем: "+7" -> 7

  // console.log( bodie + ": " + value ); // 7, 38, 1 во всех браузерах
}


// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80, {
    render: {
         fillStyle: 'white',
         strokeStyle: 'blue',
         lineWidth: 0
    }
});


const statPosX = window.innerWidth/2.5;
var ground = Bodies.rectangle(window.innerWidth/2, window.innerHeight, window.innerWidth, 40, { isStatic: true });
var groundA = Bodies.rectangle(-20, window.innerHeight, 40, window.innerHeight * 2, { isStatic: true });
var groundB = Bodies.rectangle(window.innerWidth + 20, window.innerHeight, 40, window.innerHeight * 2, { isStatic: true });
var centre = Bodies.circle(window.innerWidth/2, window.innerHeight/2-50, 100, {collisionFilter: {category: 0x0002}, isStatic: true});



newBodies.push(ground, groundA, groundB)
// add all of the bodies to the world
World.add(engine.world, newBodies);
World.add(engine.world, mouseConstraint);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

const infoBody = document.querySelector('.content'),
      title = document.querySelector('.content-title'),
      text = document.querySelector('.content-text');

infoBody.addEventListener('click', () => {
  infoBody.classList.toggle('open')
})

// Events.on(engine, 'collisionStart', function(event) {
//         var pairs = event.pairs;
//         let index = 0;
//         for (var i = 0, j = pairs.length; i != j; ++i) {
//             var pair = pairs[i];
//             // console.log(pairs[i]);
//             // console.log('collision!');
//
//             if (pair.bodyA === centre) {
//                 // pair.bodyB.render.strokeStyle = redColor;
//             } else if (pair.bodyB === centre) {
//               console.log(pair.bodyB);
//                 let iden = pair.bodyA.id - 1;
//                 for (var bodie in arrayBodies) {
//                   var value = arrayBodies[bodie];
//                   index++;
//                   if (index === iden) {
//                     console.log(value.title + value.text);
//                     title.innerHTML = value.title;
//                     text.innerHTML = value.text;
//                     infoBody.style.backgroundColor = value.color
//                     infoBody.classList.toggle('open')
//                   }
//                 }
//             }
//         }
//     });

var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    World.add(engine.world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;
    // an example of using mouse events on a mouse

    const areaCircle = document.querySelector('.area__circle')
    let boundsOne = {
      min: {
        x: window.innerWidth/2-50,
        y: window.innerHeight/2-50
      },
      max: {
        x: window.innerWidth/2 + 50,
        y: window.innerHeight/2 + 50
      }
    };
    let elem;
    let iden;
    Matter.Events.on(mouseConstraint, 'mousemove', function(event) {
        var mousePosition = event.mouse.position;
        // console.log(Matter.Query.region(Composite.allBodies(engine.world), boundsOne));
        let pair = Matter.Query.region(Composite.allBodies(engine.world), boundsOne);
        elem = pair[0];
        for (var key in elem) {
          // console.log(key);
          if (key === 'id') {
            // iden = elem[key] - 1;
            // console.log(iden);
          }
        }
        if (pair[0] != undefined) {
          areaCircle.classList.add('open')

        } else{
          areaCircle.classList.remove('open')
        }

    });

    // an example of using mouse events on a mouse
    Matter.Events.on(mouseConstraint, 'mouseup', function(event) {
        var mousePosition = event.mouse.position;

        // console.log('iden ' + iden);
        let pair = Matter.Query.region(Composite.allBodies(engine.world), boundsOne);
        elem = pair[0];
        // console.log(pair[0]);
        for (var key in elem) {
          // console.log(key);
          if (key === 'id') {
            iden = elem[key] - 1;
            // console.log(iden);
          }
          // console.log(arrayBodies[iden]);
        }

        // console.log('mouseup at ' + mousePosition.x + ' ' + mousePosition.y);

        // let iden = pair.bodyA.id - 1;
        let index = 0;
        for (var bodie in arrayBodies) {
          var value = arrayBodies[bodie];
          index++;
          if (index === iden) {
            // console.log(value.title + value.text);
            infoBody.style.backgroundColor = value.color
            title.innerHTML = value.title;
            text.innerHTML = value.text;
            // setTimeout(()=>{
              infoBody.classList.toggle('open')
            // }, 300)
            iden = undefined
          }
        }
    });

    // setInterval(function () {
    //   var addCircle = function () {
    //    return Bodies.circle(Math.random()*400 + 30, 30, 30);
    //   };
    //   World.add(engine.world, addCircle());
    //
    // }, 2000)

}
let menu = () => {
  const button = document.querySelector('.header-gamburger'),
  menu = document.querySelector('.nav');
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    menu.classList.toggle('open');
  })
}
