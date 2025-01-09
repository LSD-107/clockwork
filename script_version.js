const audio = new Audio("musiques/version.mp3");
        audio.loop = true;
		audio.volume = 0.5;

        document.addEventListener("click", () => {
            audio.play().catch(err => {
                console.error("La lecture de la musique a échoué : ", err);
            });
        }, { once: true });


        function openModal(title, imageSrc) {
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-image').src = imageSrc;
            document.getElementById('modal').style.display = 'block';
        }

        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }