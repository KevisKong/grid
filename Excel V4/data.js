//整个界面的状态储存
class Status {
    static editability = false;
    static sheetId = []
    static changeEdit(bool) {
        this.editability = bool;
    }
    static addSheetNum(id) {
        this.sheetId.push(id);
    }
    static getSheetNum() {
        return this.sheetId.length;
    }
    static isInclude(id) {
        let index = this.sheetId.indexOf(id);
        return (index==-1);
    }
}
//创建sheet的格式模板，设有默认值。同时可以更改
class SheetStyleOptions {
    constructor(cellSize, sheetSize, extraFunction) {
        if(sheetSize){//这个是否可以判断传入结果为undefined吗
            this.sheetSize = {
                rowNum:sheetSize.rowNum,
                columnNum:sheetSize.columnNum
            }
        }
        else{
            this.sheetSize={
                rowNum:100,
                columnNum:10
            }
        }
        if(cellSize){
            this.cellSize={
                width:cellSize[0],
                height:cellSize[1],
            }
        }
        else{
            this.cellSize={
                width:72,
                height:20
            }
        }
        if(extraFunction){
            this.extraFunction = {
                editability: extraFunction.editability,
                resize: extraFunction.resize,
                isIncludeTitle: extraFunction.isIncludeTitle
            }
            else{
                this.extraFunction={
                    editability:true,
                    resize:true,
                    isIncludeTitle:true
                }
            }
        }
        
    }
    changeCellSize(width, height) {
        this.cellSize.width = width + "px";
        this.cellSize.height = height + "px";
    }
    changeSheetSize(rowNum, columnNum) {
        this.sheetSize.rowNum = rowNum;
        this.sheetSize.columnNum = columnNum;
    }
    changeExtraFunction(edit, resize, isIncludeTitle) {
        this.extraFunction.editability = edit;
        this.extraFunction.resize = resize;
        this.extraFunction.isIncludeTitle = isIncludeTitle;
    }
}