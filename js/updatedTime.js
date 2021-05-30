const getUpdatedTime = (repo) =>  {
    let updated; 
    
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    let dateTime = new Date(repo.updatedAt)
    let dateTimeYear = dateTime.getFullYear()
    let dateTimeMonth = dateTime.getMonth()  
    let dateTimeDay = dateTime.getDate()
    let dateTimeHour = dateTime.getHours()
    let newDate = new Date().getFullYear()
    let newMonth = new Date().getMonth()
    let newDay = new Date().getDate()
    let newHour = new Date().getHours()
    let dayDifference = (newDay) - dateTimeDay
    let dateTimeMonthText = month[dateTimeMonth]
    let timeDifference = (parseInt(newHour) - parseInt(dateTimeHour))
    
    if(dateTimeYear === (newDate) && dateTimeMonth === newMonth) {
        if(dayDifference <= 0) {
            if(timeDifference <= 0) {
                updated = `${timeDifference} hour ago`
            }else {
                updated = `${timeDifference} hours ago`
            }      
        }else if(dayDifference === 1) {
            updated = `${dayDifference} day ago`
        }else {
            updated = `${dayDifference} days ago`
        }
    
    }
    if(dateTimeYear === (newDate) && dateTimeMonth !== newMonth) {
        updated= `on ${dateTimeMonthText} ${dateTimeDay}`
    }
    if(newDate > dateTimeYear) {
        updated = `on ${dateTimeMonthText} ${dateTimeDay}, ${dateTimeYear}`
    }
    
    return updated
}