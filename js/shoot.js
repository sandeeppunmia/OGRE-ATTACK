AFRAME.registerComponent("shoot-bullets",{
    init:function(){
        this.shootBullets();
    },
    shootBullets:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "z"){
                var bullet = document.createElement("a-entity");
                bullet.setAttribute("geometry",{
                    primite:"sphere",
                    radius:0.1
                })
                bullet.setAttribute("material","color","black");
                var cam = document.querySelector("#camera-rig");
                pos = cam.getAttribute("position");
                bullet.setAttribute("position",{
                    x:pos.x,
                    y:pos.y,
                    z:pos.z
                });
                var camera = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction); //Get the direction in which the camera is looking
                bullet.setAttribute("velocity",direction.multiplyScalar(-20)); //Multiplies this vector by scalar s
                var scene = document.querySelector("#scene");
                bullet.setAttribute("dynamic-body",{
                    shape:"sphere",
                    mass:"0"
                })
                bullet.setAttribute("visible",false);
                bullet.addEventListener("collide",this.removeBullet);
                scene.appendChild(bullet);
                this.shootSound();
            }
        })
    },
    removeBullet:function(e){
        var scene = document.querySelector("#scene");
     //bullet element
     var element = e.detail.target.el;

     //element which is hit
     var elementHit = e.detail.body.el;

    if (elementHit.id.includes("enemy")) {
      
      var countOgreEl = document.querySelector("#countOgre");
      var ogreFired = parseInt(countTankEl.getAttribute("text").value);
      ogreFired -= 1;

      countOgreEl.setAttribute("text", {
        value: ogreFired
      });

      if (ogreFired === 0) {
        var txt = document.querySelector("#completed");
        txt.setAttribute("visible", true);       
        
      }
      scene.removeChild(elementHit);  
  
      //remove event listener
      element.removeEventListener("collide", this.removeBullet);

      //remove the bullets from the scene
      scene.removeChild(element);
     }
    },
    shootSound:function(){
        var entity = document.querySelector("#sound1");
        entity.components.sound.playSound();
    }
})