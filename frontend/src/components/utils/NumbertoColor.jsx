const numbertoColor = (num) => {

    const sign = Math.sign(num)
    if(num == 0){return "inherit"}
    console.log(sign)
    if(sign > 0){
        return ("green")
    }else{
        return("red")
    }
}
export default numbertoColor
