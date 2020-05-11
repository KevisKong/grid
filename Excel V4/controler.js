window.onload=function(){
    let div=document.createElement("div");
    div.style.width="1600px";
    div.style.height="900px";
    let style=new SheetStyleOptions(undefined);
    document.body.appendChild(div);
    new Sheet(div,"s",style);
    //是否需要增加一个实例的obj，方便后边寻找调用
}