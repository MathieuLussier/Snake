    (function(window) {
        "use strict";
        function engine() {
            let _engine = {};
            let isInitialize = false;
            let game;
            let ctx;
            let lastRender = 0;
            let scale = 10;
            let score;
            let debug;
    
            _engine.init = async function() {
                return new Promise((resolve, reject) => {
                    game = document.getElementById('game');
                    score = document.getElementById('score');
                    debug = document.getElementById('debug');
                    game.width = 800;
                    game.height = 600;
                    ctx = game.getContext('2d');
                    window.requestAnimationFrame(this.loop);
                    isInitialize = true;
                    resolve(true);
                });
            }

            _engine.update = function(progress) {
                snake.update(progress);
                controller.update(progress);
                food.update(progress);
                let snakePos = snake.getPosition();
                let foodPos = food.getPosition();
                    debug.innerText = `
                     food: x: ${foodPos.x} y:${foodPos.y} \n
                     snake: x: ${snakePos.x} y:${snakePos.y} `;
                return;
            }

            _engine.draw = function() {
                this.clear(ctx, game);
                snake.draw(game, ctx, scale);
                food.draw(game, ctx, scale);
                return;
            }

            _engine.loop = function(timestamp) {
                let progress = timestamp - lastRender;
                _engine.update(progress);
                _engine.draw();
                lastRender = timestamp;
                return window.requestAnimationFrame(_engine.loop);
            }

            _engine.clear = function(context, canvas) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                var w = canvas.width;
                canvas.width = 1;
                canvas.width = w;
            }

            _engine.getDimension = function() {
                return { width: game.width, height: game.height };
            }

            _engine.addPoint = function() {
                score.innerText = Number(score.innerText) + 1;
            }

            _engine.resetPoint = function() {
                score.innerText = Number(0);
            }

            return _engine;
        }
        if (typeof window.engine === 'undefined') {
            window.engine = engine();
        }
    })(window);
    
    window.onload = async function() {
        try {
            await engine.init();
            await snake.init();
            await controller.init();
            await food.init();
        } catch(err) {
            console.error(err);
            alert(err);
        }
    }