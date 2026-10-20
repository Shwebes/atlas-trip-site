import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const canvas=document.querySelector('#globe-canvas');
if(canvas){
 const wrap=canvas.parentElement; const scene=new THREE.Scene();
 const camera=new THREE.PerspectiveCamera(38,1,.1,100);camera.position.set(0,0,4.1);
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
 const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.06;controls.enablePan=false;controls.minDistance=2.8;controls.maxDistance=5.5;
 scene.add(new THREE.AmbientLight(0xffffff,2.1));const sun=new THREE.DirectionalLight(0xffffff,2.6);sun.position.set(4,2,4);scene.add(sun);
 const globeGroup=new THREE.Group();scene.add(globeGroup);
 const textureLoader=new THREE.TextureLoader();
 const globe=new THREE.Mesh(new THREE.SphereGeometry(1,64,64),new THREE.MeshStandardMaterial({color:0x7fa5a0,roughness:.86,metalness:0}));globeGroup.add(globe);
 textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg',t=>{globe.material.map=t;globe.material.color.set(0xffffff);globe.material.needsUpdate=true;},undefined,()=>{globe.material.color.set(0x7fa5a0)});
 const atmosphere=new THREE.Mesh(new THREE.SphereGeometry(1.035,48,48),new THREE.MeshBasicMaterial({color:0x92b6b4,transparent:true,opacity:.13,side:THREE.BackSide}));globeGroup.add(atmosphere);
 const destinations=[{id:'japan',name:'Япония',lat:35.68,lon:139.69},{id:'italy',name:'Италия',lat:41.9,lon:12.5},{id:'iceland',name:'Исландия',lat:64.13,lon:-21.9},{id:'peru',name:'Перу',lat:-12.05,lon:-77.04},{id:'morocco',name:'Марокко',lat:31.63,lon:-7.99},{id:'norway',name:'Норвегия',lat:61,lon:10},{id:'thailand',name:'Таиланд',lat:13.75,lon:100.5},{id:'greece',name:'Греция',lat:37.98,lon:23.72},{id:'nepal',name:'Непал',lat:27.72,lon:85.32},{id:'newzealand',name:'Новая Зеландия',lat:-41.29,lon:174.78},{id:'france',name:'Франция',lat:48.85,lon:2.35},{id:'tanzania',name:'Танзания',lat:-6.16,lon:35.75}];
 const markers=[];const markerMaterial=new THREE.MeshBasicMaterial({color:0xd4ff85});
 function coords(lat,lon,r=1.018){const phi=(90-lat)*Math.PI/180,theta=(lon+180)*Math.PI/180;return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta));}
 destinations.forEach(d=>{const marker=new THREE.Mesh(new THREE.SphereGeometry(.025,16,16),markerMaterial.clone());marker.position.copy(coords(d.lat,d.lon));marker.userData.country=d.id;globeGroup.add(marker);markers.push(marker);const ring=new THREE.Mesh(new THREE.RingGeometry(.035,.042,32),new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide,transparent:true,opacity:.9}));ring.position.copy(coords(d.lat,d.lon,1.023));ring.lookAt(ring.position.clone().multiplyScalar(2));ring.userData.country=d.id;globeGroup.add(ring);markers.push(ring);});
 const raycaster=new THREE.Raycaster();const pointer=new THREE.Vector2();let downX=0,downY=0;
 canvas.addEventListener('pointerdown',e=>{downX=e.clientX;downY=e.clientY;});canvas.addEventListener('pointerup',e=>{if(Math.abs(e.clientX-downX)+Math.abs(e.clientY-downY)>6)return;const r=canvas.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width)*2-1;pointer.y=-((e.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(markers,false)[0];if(hit){const id=hit.object.userData.country;document.querySelector(`[data-country="${id}"]`)?.click();}});
 function resize(){const w=wrap.clientWidth,h=wrap.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}new ResizeObserver(resize).observe(wrap);resize();
 document.querySelector('#globe-reset')?.addEventListener('click',()=>{globeGroup.rotation.set(0,0,0);controls.reset();});
 function animate(){requestAnimationFrame(animate);controls.update();renderer.render(scene,camera);}animate();
}
