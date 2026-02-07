let checkbox = document.getElementById("promise")
let bottone = document.getElementById("proceed-btn")

checkbox.addEventListener("change", function(){
    if(checkbox.checked){
        bottone.disabled = false
    } else {
        bottone.disabled = true
    }
})

bottone.addEventListener("click", function(){
    window.location.href = "../PaginaDomande.html"
})