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
        if (index == -1) {
            return false;
        }
        else {
            return true;
        }
    }
}
//创建sheet的格式模板，设有默认值。同时可以更改
class SheetStyleOptions {
    constructor(cellSize = [72, 20], sheetSize = [100, 10], extraFunction = [1, 1, 1]) {
        this.sheetSize = {
            rowNum:sheetSize[0],
            columnNum:sheetSize[1]
        }
        this.cellSize={
            width:cellSize[0],
            height:cellSize[1],
        }
        this.extraFunction = {
            editability: Boolean(extraFunction[0]),
            resize: Boolean(extraFunction[1]),
            isIncludeTitle: Boolean(extraFunction[2])
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