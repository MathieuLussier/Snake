(function(window) {
    "use strict";
    function food() {
        let _food = {};
        let x;
        let y;
        let isInitialize = false;

        _food.init = async function() {
            return new Promise((resolve, reject) => {
                let dimension = engine.getDimension();
                let randomX = this.setRandomPos(50, dimension.width - 50);
                let randomY = this.setRandomPos(50, dimension.height - 50);
                x = randomX - (randomX % 10);
                y = randomY - (randomY % 10);
                isInitialize = true;
                resolve(true);
            });        
        }

        _food.update = function(progress)  {
            let snakePos = snake.getPosition();
            let minX = x - 10;
            let maxX = x + 20;
            let minY = y - 10;
            let maxY = y + 20;
            if ( (snakePos.x > minX && snakePos.x < maxX) && (snakePos.y > minY && snakePos.y < maxY) ) {
                engine.addPoint();
                snake.addNewSnail();
                this.setNewPosition();
            }
        }

        _food.draw = function(game, ctx, scale) {
            ctx.beginPath();
            ctx.arc(x + scale, y + scale, scale, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
        }

        _food.setRandomPos = function(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        _food.getPosition = function() {
            return { x, y };
        }

        _food.setNewPosition = function() {
            let dimension = engine.getDimension();
            let randomX = this.setRandomPos(50, dimension.width - 50);
            let randomY = this.setRandomPos(50, dimension.height - 50);
            x = randomX - (randomX % 10);
            y = randomY - (randomY % 10);
        }

        return _food;
    }
    if (typeof window.food === 'undefined') {
        window.food = food();
    }
})(window);