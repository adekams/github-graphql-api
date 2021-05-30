const insertRepoData = data => {
    let repoDetails = data.map(repo => {  
        let starGazer = ''
        let forkCount = ''
        let language = ''
        let color = ''

        const getRepoLanguage = data => {
            let repoLang = ''
            let lang = data.map(repo => {
                repoLang = repo.name
            }) 
            return repoLang
        }
        
        const getRepoColor = data => {
            let repoColor = ''
            let color = data.map(repo => {
                repoColor = repo.color
            })   
            return repoColor
        }
             
        let updated = getUpdatedTime(repo)
        let repoLanguageInfo = repo.languages.nodes
        let repoLanguage = getRepoLanguage(repo.languages.nodes)
        let repoColor = getRepoColor(repo.languages.nodes)

        if(repo.stargazerCount) {
            starGazer = `<span id="repo-starcount"><i class="far fa-star"></i> ${repo.stargazerCount}</span>`
        }
        if(repo.forkCount) {
            forkCount = `<span id="repo-starcount"><i class="fas fa-code-branch"></i> ${repo.forkCount}</span>`
        }
        if(repoLanguageInfo.length !== 0) {
            language = `<span id="repo-lang-name">${repoLanguage}</span>`
            color = `<small id="repo-lang-color" style="background-color:${repoColor};"></small>`
        }

        repo.description = repo.description === null ? '' : repo.description
        return `            
           <div class="github-repo">     
                <h2 id="repo-link"><a href="${repo.url}" target="_blank">${repo.name}</a></h2>
                <div class="repo flex" >     
                    <div class = "repo-details">    
                        <p id="repo-description">${repo.description}</p>
                    </div>
                    <div class = "star-repo">
                        <button>
                            <i class="far fa-star"></i> Star
                        </button>
                    </div>
                </div>        
                <div class="language-count flex">
                    <div class="repo-lang">
                        ${color}
                        ${language}
                    </div>
                    ${starGazer}
                    ${forkCount}
                    <span id="repo-updated">updated ${updated}</span>
                </div>
            </div>                  
        `
    }).join("")      
    return repoDetails
}
