export function formatDate(input) {
    var datePart = input.match(/\d+/g),
        year = datePart[0], // get only two digits
        month = datePart[1], day = datePart[2];

    return day + '/' + month + '/' + year;
}




//sorting array
export function sort(array,property,order) {
    let updated = [...array]
    return updated.sort(function (a, b) {
        if(property == 'createDate' || property== 'deadline'){
            let dateB = b[property].split("/")
            let dateA = a[property].split("/")
            return order=='asc' ? new Date(+dateB[2],dateB[1]-1,dateB[0]) - new Date(+dateA[2],dateA[1]-1,dateA[0]) :  new Date(+dateA[2],dateA[1]-1,dateA[0]) - new Date(+dateB[2],dateB[1]-1,dateB[0]);
        }
    });
}
