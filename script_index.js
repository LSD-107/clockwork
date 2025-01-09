    const audio = new Audio("musiques/menu.mp3");
        audio.loop = true;
        audio.volume = 0.5;

        document.addEventListener("click", () => {
            audio.play().catch(err => {
                console.error("La lecture de la musique a échoué : ", err);
            });
        }, { once: true });