document.addEventListener("DOMContentLoaded" , () => {
    const bird = document.querySelector(".bird")
    const gameDisplay = document.querySelector(".game-container")
    const ground = document.querySelector(".ground")
    const button = document.querySelector("button")

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 430
    let cnv 

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'

    }
    let gameTimerID = setInterval(startGame, 20)


    document.getElementById("button").addEventListener("click", jump);
    function jump(){
        if (birdBottom < 500) birdBottom += 50
        document.getElementById('audio').play();
        bird.style.bottom = birdBottom + "px"
        console.log(birdBottom)
    }
    document.addEventListener("keydown", jump)



    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeigt = Math.random() * 60
        let obstacleBottom = randomHeigt
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
       if (!isGameOver) {
        obstacle.classList.add("obstacle")
        topObstacle.classList.add("topObstacle")
       }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + "px"
        obstacle.style.bottom = obstacleBottom + "px"
        topObstacle.style.left = obstacleLeft + "px"
        topObstacle.style.bottom = obstacleBottom + gap + "px"

        function moveObstacle() {
            if (!isGameOver) {
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + "px"
            topObstacle.style.left = obstacleLeft + "px"
            }

            if (obstacleLeft === -60) {
                clearInterval()
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
                birdBottom === 0
                ) {
                gameOver()
                clearInterval(timerId)
            }


        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000)
    }
    generateObstacle()

    function gameOver() {
        clearInterval(gameTimerID)
        console.log("Game over")
        isGameOver = true
        document.removeEventListener("keyup", jump)
        window.location.reload()
    }

})