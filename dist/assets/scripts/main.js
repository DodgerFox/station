"use strict";window.onload=(()=>{menu(),dataBodies()});let dataBodies=()=>{var e=Matter.Engine,t=Matter.Render,n=(Matter.Runner,Matter.Composite),i=(Matter.Composites,Matter.Common,Matter.MouseConstraint),o=Matter.Mouse,r=Matter.World,s=(Matter.Events,Matter.Bodies),a=e.create();const l=document.getElementById("app");var d=t.create({element:l,engine:a,options:{width:window.innerWidth,height:window.innerHeight,wireframes:!1,background:"transparent"}}),c=Matter.MouseConstraint.create(a,{element:d.canvas});let u,w=[];const g=new XMLHttpRequest;if(g.open("GET","assets/data/bodies.json",!1),g.send(),200!=g.status)alert("Ошибка "+g.status+": "+g.statusText);else{const e=g.responseText;JSON.parse(e,function(e,t){return u=t,t})}for(var p in u){var h=u[p];switch(h.type){case"circle":var m=s.circle(h.posX,h.posY,h.size,{collisionFilter:{mask:1},render:{fillStyle:h.color}});w.push(m);break;case"rectangle":m=s.rectangle(h.posX,h.posY,h.width,h.height,{collisionFilter:{mask:1},render:{fillStyle:h.color}});w.push(m);break;case"trapezoid":m=s.trapezoid(h.posX,h.posY,h.width,h.height,h.slope,{collisionFilter:{mask:1},render:{fillStyle:h.color}});w.push(m);break;case"polygon":m=s.polygon(h.posX,h.posY,h.sides,h.size,{collisionFilter:{mask:1},render:{fillStyle:h.color}});w.push(m);break;default:console.log("default")}}s.rectangle(400,200,80,80,{render:{fillStyle:"white",strokeStyle:"blue",lineWidth:0}});window.innerWidth;var v=s.rectangle(window.innerWidth/2,window.innerHeight,window.innerWidth,40,{isStatic:!0}),y=s.rectangle(-20,window.innerHeight,40,2*window.innerHeight,{isStatic:!0}),M=s.rectangle(window.innerWidth+20,window.innerHeight,40,2*window.innerHeight,{isStatic:!0});s.circle(window.innerWidth/2,window.innerHeight/2-50,100,{collisionFilter:{category:2},isStatic:!0});w.push(v,y,M),r.add(a.world,w),r.add(a.world,c),e.run(a),t.run(d);const f=document.querySelector(".content"),S=document.querySelector(".content-title"),k=document.querySelector(".content-text");f.addEventListener("click",()=>{f.classList.toggle("open")});var H=o.create(d.canvas);c=i.create(a,{mouse:H,constraint:{stiffness:.2,render:{visible:!1}}});r.add(a.world,c),d.mouse=H;const L=document.querySelector(".area__circle");let b,W,E={min:{x:window.innerWidth/2-50,y:window.innerHeight/2-50},max:{x:window.innerWidth/2+50,y:window.innerHeight/2+50}};Matter.Events.on(c,"mousemove",function(e){e.mouse.position;let t=Matter.Query.region(n.allBodies(a.world),E);for(var i in b=t[0]);null!=t[0]?L.classList.add("open"):L.classList.remove("open")}),Matter.Events.on(c,"mouseup",function(e){e.mouse.position;let t=Matter.Query.region(n.allBodies(a.world),E);for(var i in b=t[0])"id"===i&&(W=b[i]-1);let o=0;for(var r in u){var s=u[r];++o===W&&(f.style.backgroundColor=s.color,S.innerHTML=s.title,k.innerHTML=s.text,f.classList.toggle("open"),W=void 0)}})},menu=()=>{const e=document.querySelector(".header-gamburger"),t=document.querySelector(".nav");e.addEventListener("click",()=>{e.classList.toggle("active"),t.classList.toggle("open")})};