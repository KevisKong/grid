//进制转换功能
class Convert{
    static toLetter(num) {
        let saveLet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        let singleLet = "";
        let val = 0;
        while (num > 0) {
            val = (num - 1) % 26
            singleLet = saveLet[val] + singleLet;
            num = Math.floor((num - 1) / 26);
        }
        return singleLet;
    }
    static toNumber(str) {
        let n = 0;
        let s = str.match(/./g);
        let j = 0;
        for (let i = str.length - 1, j = 1; i >= 0; i--, j *= 26) {
            let c = s[i].toUpperCase();
            if (c < 'A' || c > 'Z') {
                return 0;
            }
            n += (c.charCodeAt(0) - 64) * j;
        }
        return n;
    }
}
//工具类
class Tools{

    //将div的id分为表名和id
    static divideId(str){
        let i=0;
        for(i=str.length-1;i>0;i--){
            if(str[i]==="-"){
                break;
            }
        }
        return [str.slice(0,i),str.slice(i+1)];
    }
    //判断是否为行
    static JudgeRow(str){
        let p = /^[1-9]\d*$/;
        return p.test(str);
    }
    static spliceStr(){
        let output=[];
        for(let i=0;i<arguments.length;i++){
            output.push(arguments[i]);
        }
        return output.join();
    }
}