const selector = document.querySelector('select')

selector.addEventListener('change', () => {
    console.log(selector.innerHTML)
})