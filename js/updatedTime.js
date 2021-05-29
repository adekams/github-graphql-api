const getUpdatedTime = (repo) =>  {
    let updated; 
    
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    let dateTime = new Date(repo.updatedAt)
    let dateTimeYear = dateTime.getFullYear()
    let dateTimeMonth = dateTime.getMonth()  
    let dateTimeDay = dateTime.getDate()
    let newDate = new Date().getFullYear()

    dateTimeMonth = month[dateTimeMonth]
    dateTimeYear = dateTimeYear  === newDate ? '' : dateTimeYear
    if(dateTimeYear) {
        updatedAt = (`${dateTimeMonth} ${dateTime.getDate()}, ${dateTimeYear}`)
    }else {
        updatedAt = (`${dateTimeMonth} ${dateTime.getDate()}`)
    } 
    return updatedAt
}