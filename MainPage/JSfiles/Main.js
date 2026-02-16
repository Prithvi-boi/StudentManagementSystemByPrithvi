let cardCollection = document.querySelectorAll(".nav_card");
let sections = document.getElementsByTagName("section")

cardCollection.forEach(card => {
    card.addEventListener('click', function () {
        let main_text = document.getElementById("main_text")
        main_text.style.display = "none"
        cardCollection.forEach(c => c.classList.remove('active'));
        this.classList.add('active');

        for (let i = 0; i < cardCollection.length; i++) {
            let text = card.children.item(1).innerText
            const element = sections[i];
            element.style.display = "none"
            if (text == element.id) {
                element.style.display = "flex"
                console.log(element)
            }
        }
    });
});

let windowflag = false
if (windowflag == false) {
    window.setTimeout(function () {
    window.location.reload()
    windowflag = true
    },2000)
}
