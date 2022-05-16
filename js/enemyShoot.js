AFRAME.registerComponent("enemy-fireballs",{
    init:function(){
        setInterval(this.shootEnemyFireballs,2000)
    },
    shootEnemyFireballs:function(){
        var els = document.querySelectorAll(".enemy");
        for(var i=0; i<els.length; i++){
            var enemyFireball = document.createElement("a-entity");
            enemyFireball.setAttribute("geometry",{
                primitve:"sphere",
                radius:0.1,
            });
            enemyFireball.setAttribute("material","color","#282b29");
            var position = els[i].getAttribute("position");
            enemyFireball.setAttribute("position",{
                x:position.x + 1.5,
                y:position.y + 3.5,
                z:position.z
            })
            var scene = document.querySelector("#scene");
            scene.appendChild(enemyFireball);
            
            var enemy = els[i].object3D;
            var player = document.querySelector("#weapon").object3D;
            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();
            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);
            var direction = new THREE.Vector3();
            direction.subVectors(position1,position2).normalize();
            enemyFireball.setAttribute("velocity",direction.multiplyScalar(10));
            enemyFireball.setAttribute("dynamic-body",{
                shape:"sphere",
                mass:"0"
            });
            enemyFireball.setAttribute("gltf-model","#fireball")
            var element = document.querySelector("#countLife");
            var playerLife = parseInt(element.getAttribute("text").value);

            enemyFireball.addEventListener("collide",function(e){
                if(e.detail.body.el.id === "weapon"){
                    if(playerLife > 0){
                        playerLife -= 1;
                        element.setAttribute("text",{
                            value:playerLife
                        })
                    }

                    if(playerLife <= 0){
                        var txt = document.querySelector("#over");
                        txt.setAttribute("visible",true);
                        var ogreEl = document.querySelectorAll(".enemy")
                        for(var i=0; i<tankEl.length; i++){
                            scene.removeChild(ogreEl[i])
                        }
                    }
                }
            })
        }
    }
})