let parentesis =false;

document.getElementById("calculadora").addEventListener("click",e=>{
    e.preventDefault();
    try{
        console.log(e.target.tagName);
        if(e.target.value == "=") {
            // Chequeo de paréntesis
            const leftParenCount = (this.pantalla.value.match(/\(/g) || []).length;
            const rightParenCount = (this.pantalla.value.match(/\)/g) || []).length;
            if (leftParenCount === rightParenCount) {
                this.pantalla.value ="R:"+eval(this.pantalla.value);
            } else {
                alert("La expresión contiene paréntesis desbalanceados.");
            }
            return;
        }
        if(e.target.value == "()" ){
            parentesis = !parentesis;
            return parentesis ? this.pantalla.value+="(" : this.pantalla.value +=")";
        }
        if (e.target.value == "c" ) return this.pantalla.value = "";
        e.target.tagName == "INPUT"?this.pantalla.value +=e.target.value : "";
    }catch(err){
        this.pantalla.value = "ERROR";
    }
})