const selector = document.querySelector('select')


function ajax (config) {
    const xrh = new XMLHttpRequest()

    xrh.open(config.method, config.url, true)

    xrh.onload = e => {
        if (xrh.status === 200) {
            config.sucess(xrh.response, config.url)
        } else if (xrh.status >= 400) {
            config.error({
                codeError: xrh.status,
                textError: xrh.statusText
            })

        }
    }

    xrh.send()
}

const config = {
    method: 'GET',
    url: '',
    sucess(response, url) {
        const json = JSON.parse(response)
        const thereIsUl = document.querySelector('ul')
        let itemsList = []
        const containerUl = document.querySelector('.container-list')

        if(url === 'data/states.json'){
            itemsList = json.reduce(
                (html, state) => html + `<li>${state.name} - ${state.capital}</li>` , ''
            )

        } else if (url === 'data/cup.json') {
            itemsList = json.reduce(
                (html, cup) => html + `<li>${cup.year} - ${cup.hosts} - ${cup.champion}</li>` , ''
            )
        }else if (url === 'data/presidents.json'){
            itemsList = json.reduce(
                (html, presidents) => html + `<li>${presidents.position} - ${presidents.name} - ${presidents.period}</li>` , ''
            )
        }

        if(thereIsUl) {
            containerUl.innerHTML = ""
            containerUl.innerHTML = `<ul>${itemsList}</ul>`
        }else {
            containerUl.innerHTML =`<ul>${itemsList}</ul>`
        }

        
    },
    error(errorObj) {
        const containerUl = document.querySelector('.container-list')
        const message = `${errorObj.codeError}: ${errorObj.textError}`

        containerUl.innerHTML = message
    }
}

function createURL (e) {
    const indexOptionSelected = e.target.options.selectedIndex
    const valueOptionSelected = e.target.options[indexOptionSelected].value
    const url = `data/${valueOptionSelected}.json`
    return url    
}

selector.addEventListener('change', (e) => {
    config.url = createURL(e)        
    ajax(config)
})