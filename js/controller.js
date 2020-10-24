(function(window) {
    "use strict";
    function controller() {
        let _controller = {};
        let isInitialize = false;

        _controller.init = async function() {
            return new Promise((resolve, reject) => {
                isInitialize = true;
                resolve(true);
            });        
        }

        window.document.addEventListener('keydown', function(event) { 
            let code = event.keyCode;
            let speed = snake.getSpeed();
            switch(code) {
                case 38:
                if (speed.ySpeed !== 5){
                    snake.move(0, -5);
                }
                    break;
                case 40:
                if (speed.ySpeed !== -5){
                    snake.move(0, 5);
                }
                    break;
                case 37:
                if (speed.xSpeed !== 5){
                    snake.move(-5, 0);
                }
                    break;
                case 39:
                if (speed.xSpeed !== -5){
                    snake.move(5, 0);
                }
                    break;
            }  
        });

        _controller.update = function(progress)  {
            let pos = snake.getPosition(); 
            let dimension = engine.getDimension();
            let isCollision = false;
            if (pos.x <= 0) {
                snake.setPosition(0, pos.y);
                isCollision = true;
            } else if (pos.x >= dimension.width - 10) {
                snake.setPosition(dimension.width - 10, pos.y);
                isCollision = true;
            }
            if (pos.y <= 0) {
                snake.setPosition(pos.x, 0);
                isCollision = true;
            } else if (pos.y >= dimension.height - 10) {
                snake.setPosition(pos.x, dimension.height - 10);
                isCollision = true;
            }
            if (pos.x <= 0 && pos.y <= 0) {
                snake.setPosition(0, 0);
                isCollision = true;
            }
            if (pos.x <= 0 && pos.y >= dimension.height - 10) {
                snake.setPosition(0, dimension.height - 10);
                isCollision = true;
            }
            if (pos.x >= dimension.width - 10 && pos.y <= 0) {
                snake.setPosition(dimension.width - 10, 0);
                isCollision = true;
            }
            if (pos.x >= dimension.width - 10 && pos.y >= dimension.height - 10) {
                snake.setPosition(dimension.width - 10, dimension.height - 10);
                isCollision = true;
            }
            if (isCollision) snake.gameOver();
        }

        return _controller;
    }
    if (typeof window.controller === 'undefined') {
        window.controller = controller();
    }
})(window);