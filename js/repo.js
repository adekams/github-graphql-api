const insertRepoData = data => {
    let repoDetails = data.map(repo => {       
        let updated = getUpdatedTime(repo)

        repo.description = repo.description === null ? '' : repo.description
        return `            
           <div class="github-repo">     
                <h2 id="repo-link"><a href="${repo.url}" target="_blank">${repo.name}</a></h2>
                <div class="repo flex" >     
                    <div class = "repo-details">    
                        <p id="repo-description">${repo.description}</p>
                    </div>
                        <div class = "star-repo">
                            <button><i class="far fa-star"></i> Star</button>
                        </div>
                </div>        
                <div class="language-count flex">
                    <small id="repo-starcount"><i class="far fa-star"></i> ${repo.stargazerCount}</small>
                    <small id="repo-forkcount"><i class="fas fa-code-branch"></i> ${repo.forkCount}</small>
                    <small id="repo-updated">updated ${updated}</small>
                </div>
            </div>                  
        `
    }).join("")      
    return repoDetails
}
