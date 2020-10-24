(function(window) {
    "use strict";
    function snake() {
        let _snake = {};
        let isInitialize = false;
        let x;
        let y;
        let xSpeed = 5;
        let ySpeed = 0;
        let snails = 0;
        let backtrack = [];

        _snake.init = async function() {
            return new Promise((resolve, reject) => {
                x = 20;
                y = 20;
                isInitialize = true;
                resolve(true);
            });
        }

        _snake.update = function(progress) {
            backtrack.push({x: x, y: y});
            x += xSpeed;
            y += ySpeed;
            this.checkCollision();
        }

        _snake.draw = function(game, ctx, scale) {
            ctx.rect(x, y, scale, scale);
            for (let i = snails; i > 0; i--) {
                if (snails === 0) break;
                try {
                    ctx.rect(backtrack[((backtrack.length) - i)].x, backtrack[((backtrack.length) - i)].y, scale, scale);
                }catch(err) {
                    ctx.rect(x, y, scale, scale);
                }
            }
            ctx.stroke();
            this.fixMemory();
        }

        _snake.move = function(x = 5 , y = 0) {
            xSpeed = x;
            ySpeed = y;
        }

        _snake.setPosition = function(xPos = x, yPos = y) {
            x = xPos;
            y = yPos;
        } 

        _snake.getPosition = function() {
            return { x, y };
        }

        _snake.getSpeed = function() {
            return { xSpeed, ySpeed };
        }

        _snake.addNewSnail = function() {
            snails++;
        }

        _snake.checkCollision = function() {
            for (let i = snails; i > 0; i--) { 
                if (snails === 0) break;
                try {
                    if (backtrack[((backtrack.length) - i)].x === x && backtrack[((backtrack.length) - i)].y === y) {
                        this.gameOver();
                    }
                } catch(err) {
                    break;
                }
            }
        }

        _snake.fixMemory = function() {
            while(backtrack.length > snails) {
                backtrack.shift();
            }
        }

        _snake.gameOver = function() {
            x = 20;
            y = 20;
            backtrack = [];
            snails = 0;
            xSpeed = 5;
            ySpeed = 0;
            engine.resetPoint();
            food.setNewPosition();
        }

        return _snake;
    }
    if (typeof window.snake === 'undefined') {
        window.snake = snake();
    }
})(window);