
const eliminarDiacriticos = (text) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

const filtroSearch = (element, value) => {
    console.log(element)
    let x = eliminarDiacriticos(element.course.title.toLowerCase())
    if (x.includes(eliminarDiacriticos(value.toLowerCase()))) {
        return true
    }else{
        return false
    }
}

const handleChangeBar = (arrayCourses, originalInfo,text) => {
    if (text != "") {
        return arrayCourses.filter(x => filtroSearch(x, text));       
    }else{        
        return originalInfo;  
    } 
}

module.exports = {
    handleChangeBar: handleChangeBar
}